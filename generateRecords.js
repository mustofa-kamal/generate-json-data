
const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Define the constants for random data
const names = ["Abu Sayeed", "Imran Hossain", "Saiful Islam", "Mizanur Rahman", "Shahidul Alam", "Fahim Ahmed", "Rubel Hasan", "Shamim Akhtar", "Shafiqur Rahman", "Rashidul Islam", "Arman Ali", "Faruk Hossain", "Jamal Uddin", "Mofizul Haque", "Habibur Rahman", "Kamrul Islam", "Hasibul Hasan", "Jahidul Islam", "Shahriar Kabir", "Shamim Hasan", "Rakibul Islam", "Mohammad Ali", "Sohag Hossain", "Ruhul Amin", "Sabbir Hossain", "Tareq Hasan", "Sohel Rana", "Naimul Islam", "Nasir Uddin", "Alim Uddin"];
const fatherNames = ["Maqbul Hossain", "Rafiqul Alam", "Abdur Rahman", "Mokbul Hossain", "Jamal Uddin", "Habibullah", "Rahmatullah", "Mofizur Rahman", "Nur Hossain", "Abdus Salam"];
const motherNames = ["Monowara Begum", "Feroza Begum", "Jahanara Begum", "Rabeya Begum", "Halima Khatun", "Shirin Akhtar", "Saleha Begum", "Anowara Begum", "Julekha Begum", "Khadija Begum"];
const cities = ["Dhaka", "Chittagong", "Khulna", "Barisal", "Sylhet", "Mymensingh", "Rangpur", "Rajshahi", "Comilla", "Narayanganj"];
const districts = ["Dhaka", "Rangpur", "Chittagong", "Rajshahi", "Barisal", "Khulna", "Sylhet", "Mymensingh"];
const professions = ["Student", "Teacher", "Engineer", "Doctor", "Farmer", "Worker", "Businessman", "Activist"];
const incidentDates = ["2024/07/16", "2024/07/17", "2024/07/18", "2024/07/19", "2024/07/20"];


const imageUrls = [
  "https://i.imgur.com/Z8L8uwk.jpg",
  "https://i.imgur.com/pUdINYl.jpg",
  "https://i.imgur.com/FYZzeWo.jpg",
  "https://i.imgur.com/yFTkgou.jpg",
  "https://i.imgur.com/mGKYuWR.jpg",
  "https://i.imgur.com/feSkptf.jpg",
  "https://i.imgur.com/3zlCvFS.jpg",
  "https://i.imgur.com/s11tkR4.jpg"
];

const neighborhoods = ["Uttara","Badda", "Gulshan","Mohammadpur", "Motijheel", "Khilgaon","Mirpur", "Aminbazar", "Rupganj","Jatrabari", "Bashundhara","Murapara"];


// Template strings
const bioSnippetTemplate = "{name} (died {date}) was a Bangladeshi {profession} who was shot dead by the Bangladesh Police on {date}, while participating in the 2024 Bangladesh quota reform movement.";
const biographyTemplate = "{name} was a Bangladeshi {profession} who was shot dead by the Bangladesh Police on {date}, while participating in the 2024 Bangladesh quota reform movement. {name} was a student of {college} and was involved in the protest when the police opened fire on students. {name} grew up in {home_city}. His father is {father_name} and his mother is {mother_name}.";

// Function to generate a random record
function generateRecord() {
  const name = faker.helpers.arrayElement(names);
  const fatherName = faker.helpers.arrayElement(fatherNames);
  const motherName = faker.helpers.arrayElement(motherNames);
  const homeCity = faker.helpers.arrayElement(cities);
  const homeDistrict = faker.helpers.arrayElement(districts);
  const incidentCity = faker.helpers.arrayElement(cities);
  const incidentDistrict = faker.helpers.arrayElement(districts);
  const age = faker.number.int({ min: 20, max: 30 });
  const profession = faker.helpers.arrayElement(professions);
  const date = faker.helpers.arrayElement(incidentDates);
  const incidentNeighborhoods = faker.helpers.arrayElement(neighborhoods);
  const homeNeighborhoods = faker.helpers.arrayElement(neighborhoods);

  const bioSnippet = bioSnippetTemplate
    .replace(/{name}/g, name)
    .replace(/{date}/g, date)
    .replace(/{profession}/g, profession);

  const biography = biographyTemplate
    .replace(/{name}/g, name)
    .replace(/{date}/g, date)
    .replace(/{profession}/g, profession)
    .replace("{college}", "Begum Rokeya University")
    .replace("{home_city}", homeCity)
    .replace("{father_name}", fatherName)
    .replace("{mother_name}", motherName);

  // Choose a random image URL
  const imageUrl = faker.helpers.arrayElement(imageUrls);

  return {
    name:name,
    father_name: fatherName,
    mother_name: motherName,
    home_neighborhood:homeNeighborhoods,
    home_city: homeCity,
    home_district: homeDistrict,
    age:age,
    profession:profession,
    incident_neighborhood: incidentNeighborhoods,
    incident_city: incidentCity,
    incident_district: incidentDistrict,
    incident_on: date,
    bio_snippet: bioSnippet,
    biography: biography,
    image_urls: [imageUrl] // Randomly selected image URL
  };
}

// Generate multiple records
function generateRecords(count) {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push(generateRecord());
  }
  return records;
}

// Generate 50 records
const records = generateRecords(1000);

// Save records to a file
fs.writeFile('generated_records.json', JSON.stringify(records, null, 2), (err) => {
  if (err) throw err;
  console.log('Data has been saved to generated_records.json');
});
