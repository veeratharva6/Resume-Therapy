# Milestone Docs
Overview:
The idea behind our app, Resume Therapy, is to combine the very real needs of help with creating and/or updating a resume with the format of online teletherapy. Updating your resume can be a daunting task, and if you’ve yet to make one, that can be even more daunting. It is hard to know where to start. We wanted to build an user-friendly application that is not focused on the use of AI, but rather real people with real world experience in a wide variety of fields helping others set the right first impression so that they can break into the field of their career dreams or move into the role of their dreams. That’s where Resume Therapy comes in. Our application creates a platform where users can be matched with a specialist with intimate knowledge of their respective line of work, or a field of work that they’re trying to break into, and get direct feedback on how to translate their experiences, knowledge, skills and education onto their resume. At its core, this application is designed to help people, and with that in mind, the application is designed so that it can be scaled up with larger technologies like AI down the road, but the foundation is built on humans helping humans. 

	Once signed up, users of Resume Therapy can set up their profile and upload their resume (if they have one) and browse our pool of specialists they feel can help with their needs the most. After selecting a specialist, the user can schedule a video call with them to bounce ideas off of and get verbal feedback from. Additionally, they can send messages directly to the specialist they’ve connected with, and view feedback and notes posted directly to their account by the specialist. Ideally, the specialist would be former recruiters from bigger companies, as they have direct knowledge of what it takes to stand out on paper from the crowd, as well as how to have your resume not be discarded by all of the AI tools out there designed to filter out candidates. So many of the resume tools that are out there now are designed to be filled in templates and many can feel hollow, and we believe that people will see better results from talking to real experts that can help candidates represent themselves in the best ways possible. As mentioned before, this application can be scaled up at a later date after the platform is more well-developed to incorporate more tools like AI assistance or even job listings. 
	Our group is filled with 7 students either about to graduate, or will be graduating in the not so distant future. We have very different lives, interests and backgrounds, but each of us are thinking toward life after graduation where we’ll need to stand out in a world of candidates to land our first job. Our idea for the application spawned from a very real tangible need in each of our own lives, and we realize this could be a tool that helps many others in our situation, as well as so many more.



User Cases:
* User cases are ordered by importance from most to least

User case 1: 
This user is a student with little to no work experience and potentially has not even created a resume yet. They are either looking for their first “real” job or an internship and have no idea how to begin the process of creating a resume, or bolstering the small resume they currently have.

User case 2:
This user is a person that is looking to make a drastic career change. An example of this may be a person who has worked in retail or service industry for a long time and decided to do a coding bootcamp, but is worried they will not get the same looks from companies that a fresh college student would. They are having a tough time understanding how to fill out their resume. Our service helps this user list all their work experience in a way that makes them very appealing to potential suitors.

User case 3:
This user is a person with a large gap in their resume. This gap could’ve come from any number of reasons such as being a stay at home parent or being in trouble with the law. They are eager to get back to work but they are worried they won’t be able to account for their gap properly, and our service can help them with that. 

User case 4:
This user is a person that lost their job recently. It could’ve been from layoffs, from getting fired, or any other reason. But now they are overdue for updating their resume to find their next job. We can help with that by vetting them for their duties, responsibilities and skills from their previous roles.

User case 5:
This user is going for a promotion at either his current company or another company that would be providing an equivalent step up in role. We help them bolster their resume and sell themself on paper to give them the best chances to get that job.


Data Definitions:
Our data usage starts with breaking down the 2 different types of users: the customers that use the product and the employees (the specialists) that assist the customers with their resumes. Both user types will have credentials to login defined by username and password, as well as something that flags whether the user logging in is an employee or not. Both types of users will also have their own respective profile dashboard. For the customers, that dashboard will contain different types of user data including name, age, contact information, a way to upload a pdf of their current resume if they have one, the specialists they’ve connected with, and feedback left on their profile from the specialists. For the employees, they will have less information to store. The data needed from them will be their areas of expertise (for the customer to know who is best to connect with), who their connections are, and schedule for video call availability. Both user types will need to have messages saved because they’ll be able to message with each other for updates and feedback.


Functional Requirements:
Customers and specialists can register and login, using a different interface for each respective type of user. It allows them to  access their account and personal information.
Customers and specialists are able to exchange messages with each other. 
Customers and specialists can interact via video call.
Users have a profile page where they can see their personal information, upload their resume and customize their profile.
Users can follow/add specialists that they feel will assist them in their journey.

Non-functional Requirements: 
Application can be used on any modern browser (for ex. Chrome and Safari).
Data will be stored using Google Cloud, MongoDB and Firebase.
Application will be scalable with a small fault tolerance to begin (10 users), then increase later.
The interface should be easy to navigate for any type of user.
The code in the master branch of the GitHub repository will be well maintained and tested, and should be able to compile and run at any time.
Every pull request to the master branch has to be reviewed by the entire team.


High-level system requirement:

Server Host:
Google Compute Engine 1vCPU 2 GB RAM
Operating System:
Debian GNU/Linux 11
Database:
MongoDB & Firebase 
Web Server:
NGINX 1.18.0
Server-Side Language:
JS
Web Application Framework:
Express
Additional Technologies:
Bootstrap
IDE:
Visual Studio Code
Website URL:
https://team-04-app.wl.r.appspot.com

Team members and Roles:
Kevin Barbour - Team Lead
Atharva Veer - Frontend Lead
Ivan Ramos - Backend Lead
Keon Abbasi - Scrum Master & Frontend Support
Michael Petrossian - Git Master & Backend Support
Maël Teyssèdre - Backend Support
Kevin Zeng - Frontend Support

*The team meets weekly every Monday and Friday, on top of Wednesday’s class meetings.

Team Checklist:
Team found a time slot to meet outside of the class - DONE
Scrum Master shares meeting minutes with everyone after each meeting - DONE
Everyone sets up their local development environment from the team’s git repo - DONE
Team decided and agreed together on using the listed SW tools and deployment server - DONE
Team ready and able to use the chosen back/front-end frameworks. - DONE
For each technology (front/back-end/DB/cloud), team decides who will lead the study of each technology and what will be the specific goal of the study within one month from the M1 announcement. - IN PROGRESS
Team lead ensured that all team members read the final M1 and agree/understand it before submission. - DONE
