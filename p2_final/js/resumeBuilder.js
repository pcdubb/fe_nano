var name = "Paul Weyant";
var role = "Web Developer";
var age = 44;
var email = "paul.weyant@gmail.com";
var mobile = "303-335-0877";
var github = "pcdubb";
// var location = "Denver, CO";


var photoURL = "images/profile.jpg";

var skills = ["Construction Management", " Structural Engineering", " Javascript"," Data Analyst", " Python"," Java", " HTML"];

var welcomeMessage = "Paul's interactive resume";

var contacts = {"email":email, 
"mobile":mobile, 
"github": github,
"location":"Yokohama, Japan"};

var bio = {"name":name, 
"role":role, 
"contacts":contacts, 
"photoURL": photoURL,
"welcomeMessage":welcomeMessage,
"skills": skills};

var projects = {
	"projects":[
	{
	"title":"Afghanistan Buildings",
	"dates":"2010",
	"description":"Buildings Designed and built in Afghanistan for the Afghan police and army. All designs and engineering details were completed using Google Sketchup.",
	"images":["images/Footer.jpg","images/CMU2.jpg","images/Roof.jpg"]
	},
	{
	"title":"303 Property Mangement",
	"dates":"2006 - Present",
	"description":"Small collection of three rental propeties we own and operate. Website is 303PM.com",
	"images":["http://www.303pm.com/uploads/1/3/9/7/1397620/1470850_orig.jpg","http://www.lakewoodtownhouse.com/uploads/1/3/9/7/1397620/865754_orig.jpg"]
	},
	{
	"title":"Guantanamo Bay River Bridge and Warehouses",
	"dates":"2008",
	"description":"Led a team to construct a 200 foot bridge across the Guantanamo Bay river and we also constructed 2 x 8000 square foot warehouse facilities.",
	"images":["images/Bridge1.jpg","images/Bridge2.jpg","images/Bridge3.jpg","images/kSpan1.jpg","images/kSpan2.jpg"]
	}
	]
}


var work = {
"jobs": [
		{ 
			"title": "Naval Officer",
			"employer": "US Navy",
			"yearsWorked": "12",
			"location": "Ventura, CA",
			"dates" : "2004 - Present",
			"description": "Experience with negotiating contract modifications, scope definitization, project scheduling, cost estimates, review of progress payments, design/build, design/bid/build, contract closeout, contract turnover, warranty issues, construction inspection, and general project administration and project management."
		},
		{
			"title": "Afghanistan Southwest Region Support Command Engineer",
			"employer": "US Navy",
			"yearsWorked": "2",
			"location": "Helmand, Afghanistan",
			"dates" : "2010-2011",
			"description": "Designed and planned facilities for the Afghan National Army and Police throughout Helmand Province, Afghanistan."
		},
		 {
			"title": "Seabee Battalion Company Commander",
			"employer": "US Navy",
			"yearsWorked": "2",
			"location": "Guantanamo Bay, Cuba",
			"dates" : "2007-2009",
			"description": "Company Commander of a 180 person Seabee construction company (builders and steelworkers). Led a 25 person detachment to Guantanamo Bay, Cuba to build a 200 foot bridge across the Guantanamo Bay river and also constructed 2-8000 square foot warehouse facilities."
		},
		{ 
			"title": "Research Assistant",
			"employer": "MV Systems",
			"yearsWorked": "2",
			"location": "Golden, CO",
			"dates" : "2001-2003",
			"description": "Worked on thin film semiconductor research machines. The process was called plasma enhanced chemical vapor deposition and allowed the operator of the machine to deposit thin film semi-conductors onto various substrates such as glass and stainless steel."
		},
		{ 
			"title": "Nuclear Power Plant Operator",
			"employer": "US Navy",
			"yearsWorked": "6",
			"location": "Norfolk, VA",
			"dates" : "1993 - 1999",
			"description": "Operated Naval nuclear power plant. Tasks included: Radiation monitoring, chemical sampling of the primary nuclear plant cooling water, operation of steam plant, and general duties associated with nuclear/steam power plant operation."
		}
	]
}

function locationizer(someworkplace){
	var locArray = [];

	for (job in someworkplace.jobs){
		var locationEntry = someworkplace.jobs[job].location;
		locArray.push(locationEntry);
	}

	return locArray;
}



// console.log(locationizer(work));


function inName(nameToInt){
	var nameSplit = [];
	nameSplit = nameToInt.trim().split(" ");
	// console.log(nameToInt);
	nameSplit[1] = nameSplit[1].toUpperCase();
	nameSplit[0] = nameSplit[0].slice(0,1).toUpperCase() + nameSplit[0].slice(1).toLowerCase();

	return nameSplit[0] + " " + nameSplit[1];
}

// console.log(inName(name));

$("#main").append(internationalizeButton);



var education = {
"schools": [
		{ 
			"name": "Colorado School of Mines",
			"location": "Golden, CO",
			"degree": "Bachelors of Science",
			"major": "Mechanical Engineering",
			"minor": "Economics",
			"years": "1999 - 2003"
		},
		{ 
			"name": "University of Washington",
			"location": "Seattle, WA",
			"degree": "Masters of Science",
			"major": "Structural Engineering",
			"years": "2012-2013"
		}
	]
}



// below commenting out the variable pass into javascript - instead use the object dot attribute...

// example of how I did it before -- var formatedRole = HTMLheaderRole.replace("%data%",role);
$("#header").append(HTMLbioPic.replace("%data%",bio.photoURL));


$("#topContacts").prepend(HTMLlocation.replace("%data%",contacts.location));
$("#topContacts").prepend(HTMLgithub.replace("%data%",contacts.github));
$("#topContacts").prepend(HTMLmobile.replace("%data%",contacts.mobile));
$("#topContacts").prepend(HTMLemail.replace("%data%",contacts.email));

$("#header").prepend(HTMLheaderRole.replace("%data%",bio.role));

$("#header").prepend(HTMLheaderName.replace("%data%",bio.name));


if(bio.skills.length > 0){
	$("#header").append(HTMLskillsStart);

	var formattedSkill = HTMLskills.replace("%data%", bio.skills[0]);
	$("#skills").append(formattedSkill);
	formattedSkill = HTMLskills.replace("%data%", bio.skills[1]);
	$("#skills").append (formattedSkill);
	formattedSkill = HTMLskills.replace("%data%", bio.skills[2]);
	$("#skills").append (formattedSkill);
	formattedSkill = HTMLskills.replace("%data%", bio.skills[3]);
	$("#skills").append (formattedSkill);
	formattedSkill = HTMLskills.replace("%data%", bio.skills[4]);
	$("#skills").append (formattedSkill);

}

$("#header").append(HTMLWelcomeMsg.replace("%data%",bio.welcomeMessage));






function displayEducation(){
for (school in education.schools){
$("#education").append(HTMLschoolStart);

var formattedSchool = HTMLschoolName.replace
("%data%", education.schools[school].name);
var formattedDegree = HTMLschoolDegree.replace
("%data%", education.schools[school].degree);
var formattedDates = HTMLschoolDates.replace
("%data%", education.schools[school].years);
var formattedLocation = HTMLschoolLocation.replace
("%data%", education.schools[school].location);
var formattedMajor = HTMLschoolMajor.replace
("%data%", education.schools[school].major);




$(".education-entry:last").prepend(formattedDates);
$(".education-entry:last").prepend(formattedSchool);
$(".education-entry:last").append(formattedLocation);
$(".education-entry:last").append(formattedMajor);
$(".education-entry:last").append(formattedDegree);
}
}

displayEducation();









function displayWork(){
for (job in work.jobs){
$("#workExperience").append(HTMLworkStart);

var formattedEmployer = HTMLworkEmployer.replace
("%data%", work.jobs[job].employer);
var formattedTitle = HTMLworkTitle.replace
("%data%", work.jobs[job].title);
var formattedEmployerTitle = formattedEmployer +
formattedTitle;
var formattedWorkDates = HTMLworkDates.replace
("%data%", work.jobs[job].dates);
var formattedWorkDescritption = HTMLworkDescription.replace
("%data%", work.jobs[job].description);



$(".work-entry:last").append(formattedEmployerTitle);
$(".work-entry:last").append(formattedWorkDates);
$(".work-entry:last").append(formattedWorkDescritption);
}
}

displayWork();

projects.display = function() {
	for (project in projects.projects){
		$("#projects").append(HTMLprojectStart);

		var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		$(".project-entry:last").append(formattedTitle);

		var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
		$(".project-entry:last").append(formattedDates);

		var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
		$(".project-entry:last").append(formattedDescription);		

		if (projects.projects[project].images.length > 0){
			for (image in projects.projects[project].images) {
				var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
				$(".project-entry:last").append(formattedImage);
			}
		}
	}
}

projects.display();


$("#mapDiv").append(googleMap);






