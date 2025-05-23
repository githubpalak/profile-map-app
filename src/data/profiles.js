const profiles = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Software Engineer with 5 years of experience in React development",
    address: "123 Tech Street, San Francisco, CA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Hiking", "Photography", "Reading"]
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "UX Designer specializing in user research and interaction design",
    address: "456 Design Avenue, New York, NY",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    email: "jane.smith@example.com",
    phone: "(555) 234-5678",
    skills: ["UI/UX", "Figma", "Adobe XD"],
    interests: ["Painting", "Travel", "Cooking"]
  },
  {
    id: 3,
    name: "Alex Johnson",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "Data Scientist with expertise in machine learning and AI",
    address: "789 Data Drive, Seattle, WA",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    email: "alex.johnson@example.com",
    phone: "(555) 345-6789",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    interests: ["Chess", "Running", "Music"]
  },
  {
    id: 4,
    name: "Emily Davis",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "Marketing Manager with a focus on digital campaigns",
    address: "101 Marketing Road, Austin, TX",
    coordinates: { lat: 30.2672, lng: -97.7431 },
    email: "emily.davis@example.com",
    phone: "(555) 456-7890",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    interests: ["Yoga", "Gardening", "Writing"]
  },
  {
    id: 5,
    name: "Michael Wilson",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    description: "Product Manager with experience in agile methodologies",
    address: "202 Product Lane, Boston, MA",
    coordinates: { lat: 42.3601, lng: -71.0589 },
    email: "michael.wilson@example.com",
    phone: "(555) 567-8901",
    skills: ["Product Strategy", "Agile", "Team Leadership"],
    interests: ["Basketball", "Cooking", "Technology"]
  },
   {
    id: 6,
    name: "Sophia Turner",
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
    description: "Frontend Developer passionate about responsive design and UX",
    address: "303 Code Crescent, Denver, CO",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    email: "sophia.turner@example.com",
    phone: "(555) 678-9012",
    skills: ["HTML", "CSS", "React"],
    interests: ["Cycling", "Sketching", "Gaming"]
  },
  {
    id: 7,
    name: "Daniel Brown",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
    description: "DevOps Engineer focused on cloud infrastructure and automation",
    address: "404 Cloud Blvd, Atlanta, GA",
    coordinates: { lat: 33.7490, lng: -84.3880 },
    email: "daniel.brown@example.com",
    phone: "(555) 789-0123",
    skills: ["AWS", "Docker", "CI/CD"],
    interests: ["Fishing", "Biking", "Technology"]
  },
  {
    id: 8,
    name: "Lily Evans",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    description: "Project Coordinator with experience in cross-functional teams",
    address: "505 Planning Way, Portland, OR",
    coordinates: { lat: 45.5051, lng: -122.6750 },
    email: "lily.evans@example.com",
    phone: "(555) 890-1234",
    skills: ["Project Management", "Communication", "Scheduling"],
    interests: ["Reading", "Volunteering", "Swimming"]
  },
  {
    id: 9,
    name: "David Wright",
    photo: "https://randomuser.me/api/portraits/men/9.jpg",
    description: "Cybersecurity Analyst protecting networks and data integrity",
    address: "606 Secure Lane, Chicago, IL",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    email: "david.wright@example.com",
    phone: "(555) 901-2345",
    skills: ["Network Security", "Ethical Hacking", "Incident Response"],
    interests: ["Video Games", "Martial Arts", "Puzzles"]
  },
  {
    id: 10,
    name: "Grace Lee",
    photo: "https://randomuser.me/api/portraits/women/10.jpg",
    description: "AI Researcher working on NLP and deep learning models",
    address: "707 Innovation Street, Palo Alto, CA",
    coordinates: { lat: 37.4419, lng: -122.1430 },
    email: "grace.lee@example.com",
    phone: "(555) 012-3456",
    skills: ["TensorFlow", "Natural Language Processing", "Python"],
    interests: ["Robotics", "Photography", "AI Ethics"]
  },
  {
    id: 11,
    name: "Noah Harris",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    description: "Full Stack Developer with a love for scalable backend systems",
    address: "808 Dev Loop, Houston, TX",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    email: "noah.harris@example.com",
    phone: "(555) 111-2233",
    skills: ["Java", "Spring Boot", "React"],
    interests: ["Soccer", "Movies", "Blogging"]
  },
  {
    id: 12,
    name: "Olivia Martinez",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    description: "QA Engineer passionate about test automation and quality control",
    address: "909 QA Blvd, Miami, FL",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    email: "olivia.martinez@example.com",
    phone: "(555) 222-3344",
    skills: ["Selenium", "Jest", "Cypress"],
    interests: ["Reading", "Cooking", "Board Games"]
  },
  {
    id: 13,
    name: "Benjamin Clark",
    photo: "https://randomuser.me/api/portraits/men/13.jpg",
    description: "Mobile App Developer with cross-platform expertise",
    address: "1010 App Lane, Los Angeles, CA",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    email: "benjamin.clark@example.com",
    phone: "(555) 333-4455",
    skills: ["Flutter", "Kotlin", "Swift"],
    interests: ["Traveling", "Photography", "Startups"]
  },
  {
    id: 14,
    name: "Emma Walker",
    photo: "https://randomuser.me/api/portraits/women/14.jpg",
    description: "Business Analyst with experience in financial modeling",
    address: "1111 Biz Park, Chicago, IL",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    email: "emma.walker@example.com",
    phone: "(555) 444-5566",
    skills: ["Excel", "SQL", "Tableau"],
    interests: ["Investing", "Running", "Puzzles"]
  },
  {
    id: 15,
    name: "Lucas Young",
    photo: "https://randomuser.me/api/portraits/men/15.jpg",
    description: "Cloud Engineer experienced in Azure and infrastructure as code",
    address: "1212 Cloud St, Raleigh, NC",
    coordinates: { lat: 35.7796, lng: -78.6382 },
    email: "lucas.young@example.com",
    phone: "(555) 555-6677",
    skills: ["Azure", "Terraform", "Kubernetes"],
    interests: ["Home Brewing", "Drones", "Astronomy"]
  },
  {
    id: 16,
    name: "Isabella King",
    photo: "https://randomuser.me/api/portraits/women/16.jpg",
    description: "Content Strategist who crafts compelling digital narratives",
    address: "1313 Content Ct, Nashville, TN",
    coordinates: { lat: 36.1627, lng: -86.7816 },
    email: "isabella.king@example.com",
    phone: "(555) 666-7788",
    skills: ["Copywriting", "SEO", "Social Media"],
    interests: ["Writing", "Piano", "Cycling"]
  },
  {
    id: 17,
    name: "Ethan Scott",
    photo: "https://randomuser.me/api/portraits/men/17.jpg",
    description: "Robotics Engineer focused on automation and embedded systems",
    address: "1414 Robot Ave, Pittsburgh, PA",
    coordinates: { lat: 40.4406, lng: -79.9959 },
    email: "ethan.scott@example.com",
    phone: "(555) 777-8899",
    skills: ["C++", "ROS", "Embedded Systems"],
    interests: ["Robotics", "RC Cars", "Hiking"]
  },
  {
    id: 18,
    name: "Ava Lewis",
    photo: "https://randomuser.me/api/portraits/women/18.jpg",
    description: "Graphic Designer with a flair for branding and visual identity",
    address: "1515 Creative Way, Minneapolis, MN",
    coordinates: { lat: 44.9778, lng: -93.2650 },
    email: "ava.lewis@example.com",
    phone: "(555) 888-9900",
    skills: ["Illustrator", "Photoshop", "InDesign"],
    interests: ["Art Galleries", "Yoga", "Travel"]
  },
  {
    id: 19,
    name: "William Robinson",
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
    description: "IT Support Specialist with strong troubleshooting skills",
    address: "1616 Tech Support Ln, Phoenix, AZ",
    coordinates: { lat: 33.4484, lng: -112.0740 },
    email: "william.robinson@example.com",
    phone: "(555) 999-0011",
    skills: ["Windows", "Networking", "Help Desk"],
    interests: ["Tennis", "Tech Reviews", "Gaming"]
  },
  {
    id: 20,
    name: "Mia Hall",
    photo: "https://randomuser.me/api/portraits/women/20.jpg",
    description: "HR Manager with a passion for organizational development",
    address: "1717 HR Ave, Dallas, TX",
    coordinates: { lat: 32.7767, lng: -96.7970 },
    email: "mia.hall@example.com",
    phone: "(555) 000-1122",
    skills: ["Recruiting", "Employee Engagement", "Conflict Resolution"],
    interests: ["Cooking", "Podcasts", "Volunteering"]
  }
];

export default profiles;