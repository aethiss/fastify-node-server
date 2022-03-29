const fastify = require('fastify')({logger: false});
const qs = require('qs')
fastify.register(require('fastify-formbody'), { parser: str => qs.parse(str) })

// Move this file anywhere you like have a configuration file or directly from env vars
const config = {
	port: 3000
}

// I don't know the array structure, so I'm assuming is a list of strings
const specialCharacters = [];


// Routes
fastify.get('/', async (request, reply) => {
	reply.send("Fastify Server Test")
});


fastify.get("/characters", (req, res) => {
	res.send(specialCharacters);
});

fastify.get("/characters/:first_name", async (req, res) => {
	const { params } = req;
	const firstName = params?.first_name;

	for (let specialCharacter of specialCharacters) {
        console.log("checking special character " + specialCharacter);
        if (specialCharacter.first_name === firstName) {
			console.log("found");
            res.code(200).send(specialCharacter);
        }
    }
	res.code(404).send(`Special character (${firstName}) not found`);

	/*
	if (specialCharacters.includes(firstName)) {
		res.code(200).send(`Found ${firstName}`);
	} else {
		res.code(404).send(`Special character (${firstName}) not found`);
	}
	*/
});

fastify.post("/characters", async (req, res) => {
	const { body } = req;

	/*
	if (body?.first_name) {
		specialCharacters.push(body.first_name);
		res.send(`Character created ${body.first_name} !`);
	} else {
		res.code(500).send("Miss first_name parameter or wrong request");
	}
	*/
	if (body?.first_name && body?.last_name) {
		specialCharacters.push(body);
		res.send(`Character ${body.first_name} created!`);
	} else {
		res.code(400).send("wrong request");
	}
})


// Server
fastify.listen(config.port, async (err, address) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	console.log(`Server is now listening on ${address}`);
});