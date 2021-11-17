const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// service account key file from Google Cloud console.
const KEYFILEPATH =
	"D:\\Projects\\DriveUpload-ServiceAc\\ServiceAccountCred.json";

// Request full drive access.
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
	keyFile: KEYFILEPATH,
	scopes: SCOPES,
});

async function createAndUploadFile(auth) {
	const driveService = google.drive({ version: "v3", auth });

	let fileMetadata = {
		name: "icon.png",
		parents: ["1xeGxTwkkQBf306nJhC5yjiizmyZ0jSpn"],
	};

	let media = {
		mimeType: "image/jpeg",
		body: fs.createReadStream("Amazon.png"),
	};

	let response = await driveService.files.create({
		resource: fileMetadata,
		media: media,
		fields: "id",
	});

	switch (response.status) {
		case 200:
			let file = response.result;
			console.log("Created File Id: ", response.data.id);
			break;
		default:
			console.error("Error creating the file, " + response.errors);
			break;
	}
}

createAndUploadFile(auth).catch(console.error);
