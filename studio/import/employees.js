// How this works is specified in the readme

const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const sanityClient = require("@sanity/client");

const imageDir = path.join(__dirname, "images");
const csvpath = path.join(__dirname, "ansatte.csv");
const ndjsonpath = path.join(__dirname, "ansatte.ndjson");

const imagepath = (email) => `${imageDir}/${email}.jpg`;

if (fs.existsSync(ndjsonpath)) {
  fs.unlinkSync(ndjsonpath);
}

if (!fs.existsSync(csvpath)) {
  throw new Error(csvpath + " does not exist.");
}

if (!fs.existsSync(imageDir)) {
  throw new Error(imageDir + " does not exist.");
}

csv({ separator: ";" });

const client = sanityClient({
  projectId: "3drrs17h",
  apiVersion: "2021-08-31",
  dataset: "production",
  useCdn: false,
});

const getCategories = () => {
  return client.fetch('*[_type == "jobCategory"]');
};

const appendToFile = (document) => {
  const docAsNewLineJson = `${JSON.stringify(document)}\n`;
  fs.appendFileSync(ndjsonpath, docAsNewLineJson, { flag: "a+" });
};

const results = [];

fs.createReadStream(csvpath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    results.forEach((data) => {
      let phone = [
        data["Telefonnr. hjem"],
        data["Telefonnr. arbeid"],
        data["Telefonnr. mobil"],
      ]
        .map((phone) =>
          phone
            .split("")
            .filter((c) => {
              return /^\d$/.test(c);
            })
            .slice(-8)
            .join("")
        )
        .reduce((phone, cur) => {
          return phone || cur || undefined;
        });

      const id = data["E-post"].split("@")[0];

      //Needs to be absolute path to images. Update this to your path!
      const _imagepath = imagepath(data["E-post"]);

      const image =
        (fs.existsSync(_imagepath) && {
          _type: "image",
          _sanityAsset: `image@file://${_imagepath}`,
        }) ||
        undefined;

      appendToFile({
        _id: id,
        _type: "author",
        name: data.Navn,
        email: data["E-post"],
        phone,
        image,
      });
    });
    console.log("Done saving data to " + ndjsonpath);
  });
