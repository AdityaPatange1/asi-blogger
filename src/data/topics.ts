export interface TopicCategory {
  name: string;
  topics: string[];
}

export const topicCategories: TopicCategory[] = [
  {
    name: 'Artificial Intelligence & Machine Learning',
    topics: [
      'Deep Learning', 'Neural Networks', 'Natural Language Processing', 'Computer Vision',
      'Reinforcement Learning', 'Generative AI', 'Large Language Models', 'AI Ethics',
      'Autonomous Systems', 'Machine Learning Operations', 'AI in Healthcare', 'AI in Finance',
      'Robotics AI', 'Speech Recognition', 'Recommendation Systems', 'AI Governance',
      'Explainable AI', 'Federated Learning', 'Transfer Learning', 'AI Safety',
      'Cognitive Computing', 'AI Assistants', 'Predictive Analytics', 'AI Infrastructure',
      'Edge AI', 'Conversational AI', 'AI Bias', 'Neural Architecture Search',
      'AutoML', 'AI Research'
    ]
  },
  {
    name: 'Physics',
    topics: [
      'Quantum Mechanics', 'Particle Physics', 'Astrophysics', 'Thermodynamics',
      'Electromagnetism', 'Relativity Theory', 'String Theory', 'Dark Matter',
      'Dark Energy', 'Nuclear Physics', 'Condensed Matter Physics', 'Plasma Physics',
      'Optics', 'Acoustics', 'Fluid Dynamics', 'Quantum Computing',
      'Quantum Entanglement', 'Superconductivity', 'Gravitational Waves', 'Black Holes',
      'Cosmology', 'Quantum Field Theory', 'Statistical Mechanics', 'Atomic Physics',
      'Molecular Physics', 'Biophysics', 'Geophysics', 'Laser Physics',
      'Photonics', 'Nanotechnology Physics'
    ]
  },
  {
    name: 'Chemistry',
    topics: [
      'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry',
      'Biochemistry', 'Polymer Chemistry', 'Electrochemistry', 'Medicinal Chemistry',
      'Environmental Chemistry', 'Nuclear Chemistry', 'Green Chemistry', 'Computational Chemistry',
      'Photochemistry', 'Spectroscopy', 'Catalysis', 'Chemical Engineering',
      'Materials Chemistry', 'Surface Chemistry', 'Quantum Chemistry', 'Astrochemistry',
      'Food Chemistry', 'Agricultural Chemistry', 'Industrial Chemistry', 'Nanochemistry',
      'Supramolecular Chemistry', 'Petrochemistry', 'Chemical Kinetics', 'Thermochemistry'
    ]
  },
  {
    name: 'Biology & Life Sciences',
    topics: [
      'Molecular Biology', 'Cell Biology', 'Genetics', 'Evolutionary Biology',
      'Microbiology', 'Ecology', 'Marine Biology', 'Botany',
      'Zoology', 'Neuroscience', 'Immunology', 'Virology',
      'Bacteriology', 'Mycology', 'Parasitology', 'Entomology',
      'Ornithology', 'Herpetology', 'Primatology', 'Biogeography',
      'Conservation Biology', 'Developmental Biology', 'Systems Biology', 'Synthetic Biology',
      'Bioinformatics', 'Proteomics', 'Genomics', 'Epigenetics',
      'Stem Cell Biology', 'Astrobiology'
    ]
  },
  {
    name: 'Medicine & Healthcare',
    topics: [
      'Internal Medicine', 'Surgery', 'Pediatrics', 'Psychiatry',
      'Cardiology', 'Oncology', 'Neurology', 'Dermatology',
      'Orthopedics', 'Ophthalmology', 'Radiology', 'Pathology',
      'Pharmacology', 'Epidemiology', 'Public Health', 'Preventive Medicine',
      'Emergency Medicine', 'Family Medicine', 'Geriatrics', 'Infectious Diseases',
      'Endocrinology', 'Gastroenterology', 'Pulmonology', 'Nephrology',
      'Rheumatology', 'Hematology', 'Anesthesiology', 'Palliative Care',
      'Sports Medicine', 'Telemedicine', 'Personalized Medicine', 'Regenerative Medicine'
    ]
  },
  {
    name: 'Computer Science & Software',
    topics: [
      'Algorithms', 'Data Structures', 'Operating Systems', 'Databases',
      'Distributed Systems', 'Cloud Computing', 'Software Engineering', 'Web Development',
      'Mobile Development', 'DevOps', 'System Design', 'API Design',
      'Microservices', 'Serverless Computing', 'Containers', 'Version Control',
      'Testing', 'Code Review', 'Technical Debt', 'Software Architecture',
      'Functional Programming', 'Object-Oriented Programming', 'Concurrent Programming', 'Low-Level Programming',
      'Compilers', 'Programming Languages', 'Type Systems', 'Memory Management',
      'Performance Optimization', 'Debugging'
    ]
  },
  {
    name: 'Cybersecurity',
    topics: [
      'Network Security', 'Application Security', 'Cloud Security', 'Cryptography',
      'Penetration Testing', 'Threat Intelligence', 'Incident Response', 'Security Operations',
      'Identity Management', 'Access Control', 'Vulnerability Management', 'Malware Analysis',
      'Forensics', 'Security Architecture', 'Zero Trust', 'Compliance',
      'Privacy', 'Data Protection', 'Endpoint Security', 'IoT Security',
      'Mobile Security', 'Security Awareness', 'Risk Management', 'Security Automation',
      'Bug Bounty', 'Ethical Hacking', 'Security Certifications', 'Blockchain Security'
    ]
  },
  {
    name: 'Data Science & Analytics',
    topics: [
      'Data Mining', 'Statistical Analysis', 'Data Visualization', 'Business Intelligence',
      'Big Data', 'Data Engineering', 'Data Warehousing', 'ETL Processes',
      'Real-time Analytics', 'Predictive Modeling', 'A/B Testing', 'Experimentation',
      'Data Quality', 'Data Governance', 'Master Data Management', 'Data Catalogs',
      'Time Series Analysis', 'Geospatial Analysis', 'Text Analytics', 'Social Network Analysis',
      'Customer Analytics', 'Marketing Analytics', 'Financial Analytics', 'Healthcare Analytics',
      'Sports Analytics', 'Supply Chain Analytics', 'People Analytics', 'Fraud Detection'
    ]
  },
  {
    name: 'Mathematics',
    topics: [
      'Algebra', 'Calculus', 'Statistics', 'Probability',
      'Linear Algebra', 'Differential Equations', 'Number Theory', 'Topology',
      'Geometry', 'Trigonometry', 'Mathematical Logic', 'Set Theory',
      'Graph Theory', 'Combinatorics', 'Numerical Analysis', 'Optimization',
      'Game Theory', 'Chaos Theory', 'Fractal Geometry', 'Applied Mathematics',
      'Mathematical Modeling', 'Operations Research', 'Cryptographic Mathematics', 'Financial Mathematics',
      'Actuarial Science', 'Mathematical Physics', 'Category Theory', 'Abstract Algebra'
    ]
  },
  {
    name: 'Astronomy & Space Science',
    topics: [
      'Solar System', 'Exoplanets', 'Stars', 'Galaxies',
      'Nebulae', 'Supernovae', 'Pulsars', 'Quasars',
      'Comets', 'Asteroids', 'Meteor Showers', 'Space Exploration',
      'Space Telescopes', 'Radio Astronomy', 'Planetary Science', 'Astrobiology',
      'Space Weather', 'Satellite Technology', 'Orbital Mechanics', 'Spacecraft Design',
      'Moon Exploration', 'Mars Exploration', 'Space Colonization', 'Space Tourism',
      'Rocket Science', 'Space Stations', 'Space Mining', 'Extraterrestrial Life',
      'SETI', 'Multiverse Theory'
    ]
  },
  {
    name: 'Environmental Science',
    topics: [
      'Climate Change', 'Global Warming', 'Carbon Footprint', 'Renewable Energy',
      'Solar Energy', 'Wind Energy', 'Hydroelectric Power', 'Geothermal Energy',
      'Biomass Energy', 'Energy Storage', 'Sustainability', 'Circular Economy',
      'Waste Management', 'Recycling', 'Water Conservation', 'Air Quality',
      'Deforestation', 'Biodiversity Loss', 'Ocean Conservation', 'Coral Reefs',
      'Wildlife Conservation', 'Endangered Species', 'Pollution Control', 'Environmental Policy',
      'Green Technology', 'Eco-Architecture', 'Sustainable Agriculture', 'Carbon Capture',
      'Climate Adaptation', 'Environmental Justice'
    ]
  },
  {
    name: 'Engineering',
    topics: [
      'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering',
      'Aerospace Engineering', 'Biomedical Engineering', 'Industrial Engineering', 'Materials Engineering',
      'Nuclear Engineering', 'Environmental Engineering', 'Structural Engineering', 'Automotive Engineering',
      'Marine Engineering', 'Mining Engineering', 'Petroleum Engineering', 'Agricultural Engineering',
      'Robotics Engineering', 'Mechatronics', 'Control Systems', 'Signal Processing',
      'Power Systems', 'VLSI Design', 'Embedded Systems', 'Manufacturing',
      'Quality Engineering', 'Reliability Engineering', 'Systems Engineering', 'Engineering Ethics'
    ]
  },
  {
    name: 'Economics',
    topics: [
      'Microeconomics', 'Macroeconomics', 'Behavioral Economics', 'Development Economics',
      'International Economics', 'Labor Economics', 'Public Economics', 'Health Economics',
      'Environmental Economics', 'Agricultural Economics', 'Urban Economics', 'Financial Economics',
      'Monetary Policy', 'Fiscal Policy', 'Trade Policy', 'Economic History',
      'Econometrics', 'Economic Forecasting', 'Market Structure', 'Competition Policy',
      'Income Inequality', 'Poverty Economics', 'Economic Growth', 'Economic Cycles',
      'Inflation', 'Unemployment', 'Globalization', 'Cryptocurrency Economics'
    ]
  },
  {
    name: 'Finance & Investment',
    topics: [
      'Personal Finance', 'Corporate Finance', 'Investment Banking', 'Asset Management',
      'Portfolio Theory', 'Risk Management', 'Derivatives', 'Options Trading',
      'Futures Trading', 'Forex Trading', 'Stock Analysis', 'Technical Analysis',
      'Fundamental Analysis', 'Value Investing', 'Growth Investing', 'Dividend Investing',
      'Real Estate Investment', 'Private Equity', 'Venture Capital', 'Hedge Funds',
      'Mutual Funds', 'ETFs', 'Bonds', 'Fixed Income',
      'Retirement Planning', 'Tax Planning', 'Estate Planning', 'Wealth Management',
      'Financial Planning', 'Fintech'
    ]
  },
  {
    name: 'Blockchain & Cryptocurrency',
    topics: [
      'Bitcoin', 'Ethereum', 'Smart Contracts', 'DeFi',
      'NFTs', 'Tokenomics', 'Consensus Mechanisms', 'Mining',
      'Staking', 'Layer 2 Solutions', 'Cross-chain Technology', 'Cryptocurrency Wallets',
      'Decentralized Exchanges', 'Centralized Exchanges', 'Crypto Regulations', 'Stablecoins',
      'DAOs', 'Web3', 'Blockchain Scalability', 'Privacy Coins',
      'Blockchain Development', 'dApps', 'Blockchain Gaming', 'Metaverse',
      'Digital Identity', 'Supply Chain Blockchain', 'Healthcare Blockchain', 'Blockchain Voting'
    ]
  },
  {
    name: 'Business & Entrepreneurship',
    topics: [
      'Startup Strategy', 'Business Models', 'Lean Startup', 'Business Planning',
      'Fundraising', 'Pitch Decks', 'Angel Investing', 'Bootstrap Business',
      'Scaling Startups', 'Product-Market Fit', 'Customer Development', 'Growth Hacking',
      'Business Development', 'Strategic Partnerships', 'Mergers & Acquisitions', 'Exit Strategy',
      'Corporate Strategy', 'Business Innovation', 'Disruptive Innovation', 'Blue Ocean Strategy',
      'Competitive Analysis', 'SWOT Analysis', 'Business Ethics', 'Corporate Governance',
      'Family Business', 'Social Entrepreneurship', 'Franchise Business', 'E-commerce Business'
    ]
  },
  {
    name: 'Marketing',
    topics: [
      'Digital Marketing', 'Content Marketing', 'Social Media Marketing', 'SEO',
      'SEM', 'Email Marketing', 'Influencer Marketing', 'Affiliate Marketing',
      'Video Marketing', 'Podcast Marketing', 'Brand Strategy', 'Brand Identity',
      'Marketing Analytics', 'Marketing Automation', 'CRM', 'Customer Journey',
      'Conversion Optimization', 'Landing Pages', 'Copywriting', 'Storytelling',
      'Guerrilla Marketing', 'Viral Marketing', 'Word of Mouth', 'Public Relations',
      'Event Marketing', 'Trade Shows', 'Account-Based Marketing', 'Product Marketing',
      'Market Research', 'Consumer Behavior'
    ]
  },
  {
    name: 'Management & Leadership',
    topics: [
      'Leadership Styles', 'Team Management', 'Project Management', 'Agile Methodology',
      'Scrum', 'Kanban', 'Change Management', 'Organizational Design',
      'Talent Management', 'Performance Management', 'Employee Engagement', 'Coaching',
      'Mentoring', 'Conflict Resolution', 'Negotiation', 'Decision Making',
      'Strategic Planning', 'OKRs', 'KPIs', 'Business Process Management',
      'Quality Management', 'Six Sigma', 'Lean Management', 'Operations Management',
      'Supply Chain Management', 'Inventory Management', 'Vendor Management', 'Crisis Management',
      'Remote Team Management', 'Diversity & Inclusion'
    ]
  },
  {
    name: 'Psychology',
    topics: [
      'Clinical Psychology', 'Cognitive Psychology', 'Developmental Psychology', 'Social Psychology',
      'Abnormal Psychology', 'Positive Psychology', 'Health Psychology', 'Neuropsychology',
      'Educational Psychology', 'Industrial Psychology', 'Forensic Psychology', 'Sports Psychology',
      'Evolutionary Psychology', 'Personality Psychology', 'Behavioral Psychology', 'Psychotherapy',
      'Cognitive Behavioral Therapy', 'Psychoanalysis', 'Mindfulness', 'Emotional Intelligence',
      'Stress Management', 'Anxiety Disorders', 'Depression', 'PTSD',
      'Addiction Psychology', 'Sleep Psychology', 'Memory', 'Learning Psychology',
      'Motivation', 'Decision Psychology'
    ]
  },
  {
    name: 'Philosophy',
    topics: [
      'Ethics', 'Epistemology', 'Metaphysics', 'Logic',
      'Philosophy of Mind', 'Philosophy of Science', 'Political Philosophy', 'Philosophy of Language',
      'Aesthetics', 'Existentialism', 'Phenomenology', 'Pragmatism',
      'Stoicism', 'Buddhism Philosophy', 'Eastern Philosophy', 'Western Philosophy',
      'Ancient Philosophy', 'Medieval Philosophy', 'Modern Philosophy', 'Contemporary Philosophy',
      'Philosophy of Religion', 'Philosophy of Technology', 'Bioethics', 'Environmental Ethics',
      'Business Ethics', 'AI Ethics', 'Free Will', 'Consciousness Studies'
    ]
  },
  {
    name: 'History',
    topics: [
      'Ancient History', 'Medieval History', 'Modern History', 'Contemporary History',
      'World History', 'European History', 'American History', 'Asian History',
      'African History', 'Latin American History', 'Middle Eastern History', 'Military History',
      'Political History', 'Economic History', 'Social History', 'Cultural History',
      'Art History', 'History of Science', 'History of Technology', 'History of Medicine',
      'Archaeological History', 'Oral History', 'Public History', 'Digital History',
      'Cold War', 'World War I', 'World War II', 'Colonial History',
      'Industrial Revolution', 'Renaissance'
    ]
  },
  {
    name: 'Literature & Writing',
    topics: [
      'Fiction Writing', 'Non-Fiction Writing', 'Poetry', 'Drama',
      'Short Stories', 'Novel Writing', 'Screenwriting', 'Playwriting',
      'Creative Writing', 'Technical Writing', 'Academic Writing', 'Business Writing',
      'Journalism', 'Blogging', 'Copywriting', 'Content Writing',
      'Literary Criticism', 'Literary Theory', 'Comparative Literature', 'World Literature',
      'American Literature', 'British Literature', 'Classical Literature', 'Modern Literature',
      'Postmodern Literature', 'Science Fiction', 'Fantasy', 'Mystery',
      'Romance', 'Thriller'
    ]
  },
  {
    name: 'Languages & Linguistics',
    topics: [
      'Phonetics', 'Phonology', 'Morphology', 'Syntax',
      'Semantics', 'Pragmatics', 'Sociolinguistics', 'Psycholinguistics',
      'Historical Linguistics', 'Computational Linguistics', 'Applied Linguistics', 'Corpus Linguistics',
      'Language Acquisition', 'Second Language Learning', 'Translation Studies', 'Interpretation',
      'Lexicography', 'Etymology', 'Dialectology', 'Language Documentation',
      'Endangered Languages', 'Sign Language', 'Language Policy', 'Multilingualism',
      'Language Teaching', 'Grammar', 'Discourse Analysis', 'Rhetoric'
    ]
  },
  {
    name: 'Art & Design',
    topics: [
      'Graphic Design', 'UI Design', 'UX Design', 'Web Design',
      'Product Design', 'Industrial Design', 'Interior Design', 'Fashion Design',
      'Architecture', 'Landscape Design', 'Typography', 'Illustration',
      'Animation', '3D Modeling', 'Motion Graphics', 'Visual Design',
      'Color Theory', 'Design Systems', 'Design Thinking', 'Human-Centered Design',
      'Accessibility Design', 'Responsive Design', 'Brand Design', 'Package Design',
      'Print Design', 'Environmental Design', 'Game Design', 'Experience Design',
      'Service Design', 'Design Research'
    ]
  },
  {
    name: 'Music',
    topics: [
      'Music Theory', 'Composition', 'Songwriting', 'Music Production',
      'Sound Engineering', 'Mixing', 'Mastering', 'Music Technology',
      'Electronic Music', 'Classical Music', 'Jazz', 'Rock',
      'Pop Music', 'Hip Hop', 'R&B', 'Country Music',
      'Folk Music', 'World Music', 'Film Scoring', 'Game Music',
      'Music History', 'Music Psychology', 'Music Education', 'Music Business',
      'Live Performance', 'Orchestration', 'Music Software', 'Synthesizers'
    ]
  },
  {
    name: 'Film & Media',
    topics: [
      'Film Production', 'Cinematography', 'Film Directing', 'Film Editing',
      'Sound Design', 'Visual Effects', 'Documentary', 'Animation Film',
      'Film History', 'Film Theory', 'Film Criticism', 'Screenwriting',
      'Acting', 'Casting', 'Production Design', 'Costume Design',
      'Film Distribution', 'Film Marketing', 'Streaming Platforms', 'Television Production',
      'Broadcast Media', 'Digital Media', 'Media Studies', 'Media Ethics',
      'Media Literacy', 'Journalism Ethics', 'Photojournalism', 'Podcasting'
    ]
  },
  {
    name: 'Photography',
    topics: [
      'Portrait Photography', 'Landscape Photography', 'Street Photography', 'Wildlife Photography',
      'Sports Photography', 'Fashion Photography', 'Product Photography', 'Food Photography',
      'Architecture Photography', 'Event Photography', 'Wedding Photography', 'Travel Photography',
      'Macro Photography', 'Astrophotography', 'Underwater Photography', 'Drone Photography',
      'Documentary Photography', 'Fine Art Photography', 'Black and White', 'Photo Editing',
      'Lightroom', 'Photoshop', 'Camera Technology', 'Lens Selection',
      'Lighting Techniques', 'Composition', 'Photography Business', 'Stock Photography'
    ]
  },
  {
    name: 'Education & Learning',
    topics: [
      'Educational Theory', 'Curriculum Design', 'Instructional Design', 'E-Learning',
      'Online Education', 'Blended Learning', 'Classroom Management', 'Assessment',
      'Educational Technology', 'Learning Management Systems', 'MOOC', 'Microlearning',
      'Adult Education', 'Early Childhood Education', 'Primary Education', 'Secondary Education',
      'Higher Education', 'Special Education', 'Gifted Education', 'STEM Education',
      'Arts Education', 'Physical Education', 'Education Policy', 'Education Reform',
      'Teacher Training', 'Student Engagement', 'Learning Analytics', 'Personalized Learning',
      'Competency-Based Education', 'Lifelong Learning'
    ]
  },
  {
    name: 'Sports & Fitness',
    topics: [
      'Football', 'Basketball', 'Soccer', 'Tennis',
      'Golf', 'Baseball', 'Cricket', 'Rugby',
      'Swimming', 'Running', 'Cycling', 'Marathon',
      'Triathlon', 'Weightlifting', 'CrossFit', 'Yoga',
      'Pilates', 'Martial Arts', 'Boxing', 'MMA',
      'Olympic Sports', 'Winter Sports', 'Extreme Sports', 'Esports',
      'Sports Science', 'Sports Nutrition', 'Sports Psychology', 'Athletic Training',
      'Injury Prevention', 'Recovery'
    ]
  },
  {
    name: 'Health & Wellness',
    topics: [
      'Nutrition', 'Diet Planning', 'Weight Management', 'Healthy Eating',
      'Vitamins & Supplements', 'Hydration', 'Sleep Health', 'Stress Relief',
      'Mental Wellness', 'Work-Life Balance', 'Self-Care', 'Mindfulness Practice',
      'Meditation', 'Breathing Exercises', 'Holistic Health', 'Alternative Medicine',
      'Ayurveda', 'Traditional Chinese Medicine', 'Homeopathy', 'Naturopathy',
      'Chiropractic', 'Acupuncture', 'Massage Therapy', 'Physical Therapy',
      'Occupational Health', 'Preventive Health', 'Longevity', 'Anti-Aging',
      'Biohacking', 'Wearable Health Tech'
    ]
  },
  {
    name: 'Food & Cooking',
    topics: [
      'Home Cooking', 'Baking', 'Pastry', 'Grilling',
      'Vegetarian Cooking', 'Vegan Cooking', 'Mediterranean Diet', 'Asian Cuisine',
      'Italian Cuisine', 'French Cuisine', 'Mexican Cuisine', 'Indian Cuisine',
      'Japanese Cuisine', 'Chinese Cuisine', 'Middle Eastern Cuisine', 'African Cuisine',
      'Molecular Gastronomy', 'Farm to Table', 'Food Science', 'Food Safety',
      'Food Preservation', 'Fermentation', 'Wine', 'Craft Beer',
      'Coffee', 'Tea', 'Cocktails', 'Restaurant Industry',
      'Food Photography', 'Food Writing'
    ]
  },
  {
    name: 'Travel & Geography',
    topics: [
      'Travel Planning', 'Budget Travel', 'Luxury Travel', 'Adventure Travel',
      'Solo Travel', 'Family Travel', 'Business Travel', 'Sustainable Travel',
      'Cultural Tourism', 'Ecotourism', 'Heritage Tourism', 'Medical Tourism',
      'Travel Photography', 'Travel Writing', 'Digital Nomad', 'Expat Life',
      'World Geography', 'Physical Geography', 'Human Geography', 'Urban Geography',
      'Economic Geography', 'Political Geography', 'Cartography', 'GIS',
      'Remote Sensing', 'Climate Geography', 'Biogeography', 'Cultural Geography'
    ]
  },
  {
    name: 'Fashion & Style',
    topics: [
      'Fashion Design', 'Fashion History', 'Fashion Trends', 'Sustainable Fashion',
      'Haute Couture', 'Ready-to-Wear', 'Streetwear', 'Athleisure',
      'Mens Fashion', 'Womens Fashion', 'Accessories', 'Footwear',
      'Jewelry Design', 'Textile Design', 'Pattern Making', 'Fashion Technology',
      'Fashion Marketing', 'Fashion Retail', 'Fashion Photography', 'Fashion Journalism',
      'Personal Styling', 'Color Analysis', 'Body Types', 'Wardrobe Planning',
      'Fashion Business', 'Fashion Week', 'Fashion Icons', 'Vintage Fashion'
    ]
  },
  {
    name: 'Home & Living',
    topics: [
      'Home Decor', 'Interior Styling', 'Home Organization', 'Minimalism',
      'Smart Home', 'Home Automation', 'Home Security', 'Home Maintenance',
      'DIY Projects', 'Woodworking', 'Furniture Design', 'Lighting Design',
      'Garden Design', 'Landscaping', 'Indoor Plants', 'Urban Gardening',
      'Kitchen Design', 'Bathroom Design', 'Bedroom Design', 'Living Room Design',
      'Home Office', 'Storage Solutions', 'Sustainable Living', 'Zero Waste',
      'Energy Efficiency', 'Water Conservation', 'Home Renovation', 'Real Estate'
    ]
  },
  {
    name: 'Parenting & Family',
    topics: [
      'Pregnancy', 'Childbirth', 'Newborn Care', 'Infant Development',
      'Toddler Development', 'Child Psychology', 'Positive Parenting', 'Discipline',
      'Education Choices', 'Homeschooling', 'Special Needs Parenting', 'Adoption',
      'Single Parenting', 'Co-Parenting', 'Blended Families', 'Teen Parenting',
      'Family Relationships', 'Sibling Dynamics', 'Grandparenting', 'Family Traditions',
      'Family Finance', 'Family Health', 'Family Activities', 'Family Travel',
      'Work-Family Balance', 'Childcare', 'Family Communication', 'Family Therapy'
    ]
  },
  {
    name: 'Relationships',
    topics: [
      'Dating', 'Online Dating', 'Relationship Building', 'Communication Skills',
      'Love Languages', 'Marriage', 'Wedding Planning', 'Long-term Relationships',
      'Long Distance Relationships', 'Relationship Challenges', 'Conflict Resolution', 'Trust Building',
      'Intimacy', 'Relationship Psychology', 'Attachment Styles', 'Healthy Boundaries',
      'Breakups', 'Divorce', 'Moving On', 'Self-Love',
      'Friendship', 'Social Skills', 'Networking', 'Professional Relationships',
      'Mentorship', 'Community Building', 'Social Support', 'Relationship Goals'
    ]
  },
  {
    name: 'Personal Development',
    topics: [
      'Goal Setting', 'Time Management', 'Productivity', 'Habit Formation',
      'Self-Discipline', 'Motivation', 'Confidence Building', 'Public Speaking',
      'Communication Skills', 'Emotional Intelligence', 'Critical Thinking', 'Problem Solving',
      'Creativity', 'Innovation', 'Adaptability', 'Resilience',
      'Growth Mindset', 'Self-Awareness', 'Personal Branding', 'Career Development',
      'Life Purpose', 'Values Clarification', 'Decision Making', 'Risk Taking',
      'Failure Recovery', 'Success Habits', 'Morning Routines', 'Journaling'
    ]
  },
  {
    name: 'Career & Work',
    topics: [
      'Job Search', 'Resume Writing', 'Interview Skills', 'Salary Negotiation',
      'Career Transition', 'Career Planning', 'Professional Development', 'Workplace Skills',
      'Remote Work', 'Freelancing', 'Consulting', 'Side Hustles',
      'Gig Economy', 'Career Growth', 'Promotions', 'Workplace Politics',
      'Office Culture', 'Team Collaboration', 'Workplace Communication', 'Presentation Skills',
      'Business Writing', 'Email Etiquette', 'Meeting Management', 'Workplace Wellness',
      'Burnout Prevention', 'Work Stress', 'Career Satisfaction', 'Work Values'
    ]
  },
  {
    name: 'Law & Legal',
    topics: [
      'Constitutional Law', 'Criminal Law', 'Civil Law', 'Contract Law',
      'Corporate Law', 'Intellectual Property', 'Patent Law', 'Trademark Law',
      'Copyright Law', 'Employment Law', 'Labor Law', 'Immigration Law',
      'Family Law', 'Estate Planning', 'Tax Law', 'Environmental Law',
      'International Law', 'Human Rights Law', 'Privacy Law', 'Cyber Law',
      'Health Law', 'Sports Law', 'Entertainment Law', 'Real Estate Law',
      'Banking Law', 'Securities Law', 'Legal Technology', 'Legal Ethics'
    ]
  },
  {
    name: 'Politics & Government',
    topics: [
      'Political Theory', 'Democracy', 'Authoritarianism', 'Political Parties',
      'Elections', 'Voting Systems', 'Political Campaigns', 'Public Policy',
      'Foreign Policy', 'Diplomacy', 'International Relations', 'Geopolitics',
      'Political Economy', 'Public Administration', 'Bureaucracy', 'Local Government',
      'Federal Government', 'Legislative Process', 'Executive Power', 'Judicial System',
      'Civil Rights', 'Human Rights', 'Political Activism', 'Social Movements',
      'Political Communication', 'Political Psychology', 'Comparative Politics', 'Political History'
    ]
  },
  {
    name: 'Sociology',
    topics: [
      'Social Theory', 'Social Structure', 'Social Stratification', 'Social Class',
      'Social Mobility', 'Social Change', 'Socialization', 'Culture',
      'Subcultures', 'Deviance', 'Crime', 'Social Control',
      'Social Institutions', 'Family Sociology', 'Education Sociology', 'Religion Sociology',
      'Economic Sociology', 'Political Sociology', 'Urban Sociology', 'Rural Sociology',
      'Medical Sociology', 'Environmental Sociology', 'Digital Sociology', 'Gender Studies',
      'Race & Ethnicity', 'Immigration', 'Globalization', 'Social Networks'
    ]
  },
  {
    name: 'Anthropology',
    topics: [
      'Cultural Anthropology', 'Social Anthropology', 'Physical Anthropology', 'Archaeology',
      'Linguistic Anthropology', 'Applied Anthropology', 'Medical Anthropology', 'Economic Anthropology',
      'Political Anthropology', 'Legal Anthropology', 'Visual Anthropology', 'Digital Anthropology',
      'Urban Anthropology', 'Environmental Anthropology', 'Cognitive Anthropology', 'Psychological Anthropology',
      'Ethnography', 'Ethnology', 'Human Evolution', 'Primatology',
      'Kinship Studies', 'Religion Anthropology', 'Art Anthropology', 'Food Anthropology',
      'Migration Studies', 'Indigenous Studies', 'Folklore', 'Material Culture'
    ]
  },
  {
    name: 'Religion & Spirituality',
    topics: [
      'Christianity', 'Islam', 'Judaism', 'Hinduism',
      'Buddhism', 'Sikhism', 'Taoism', 'Confucianism',
      'Shintoism', 'Indigenous Religions', 'New Religious Movements', 'Atheism',
      'Agnosticism', 'Secularism', 'Comparative Religion', 'Religious History',
      'Theology', 'Religious Philosophy', 'Religious Ethics', 'Religious Practice',
      'Meditation', 'Prayer', 'Mysticism', 'Spirituality',
      'Religious Art', 'Sacred Texts', 'Religious Education', 'Interfaith Dialogue'
    ]
  },
  {
    name: 'Agriculture',
    topics: [
      'Crop Science', 'Soil Science', 'Plant Pathology', 'Entomology',
      'Animal Husbandry', 'Dairy Farming', 'Poultry Farming', 'Aquaculture',
      'Organic Farming', 'Sustainable Agriculture', 'Precision Agriculture', 'Vertical Farming',
      'Hydroponics', 'Aeroponics', 'Permaculture', 'Agroforestry',
      'Agricultural Economics', 'Agricultural Policy', 'Food Security', 'Rural Development',
      'Agricultural Technology', 'Farm Management', 'Irrigation', 'Pesticides',
      'Fertilizers', 'Seed Technology', 'Horticulture', 'Viticulture'
    ]
  },
  {
    name: 'Architecture',
    topics: [
      'Architectural Design', 'Architectural History', 'Modern Architecture', 'Contemporary Architecture',
      'Classical Architecture', 'Gothic Architecture', 'Renaissance Architecture', 'Baroque Architecture',
      'Art Deco', 'Brutalism', 'Minimalist Architecture', 'Sustainable Architecture',
      'Green Building', 'Biophilic Design', 'Parametric Architecture', 'Computational Design',
      'Urban Planning', 'City Design', 'Public Spaces', 'Residential Architecture',
      'Commercial Architecture', 'Institutional Architecture', 'Religious Architecture', 'Industrial Architecture',
      'Landscape Architecture', 'Interior Architecture', 'Building Technology', 'Structural Systems'
    ]
  },
  {
    name: 'Gaming',
    topics: [
      'Video Game Design', 'Game Development', 'Game Programming', 'Game Art',
      'Level Design', 'Narrative Design', 'Game Mechanics', 'Game Balance',
      'Mobile Gaming', 'Console Gaming', 'PC Gaming', 'Cloud Gaming',
      'VR Gaming', 'AR Gaming', 'Esports', 'Competitive Gaming',
      'Indie Games', 'AAA Games', 'RPG Games', 'FPS Games',
      'Strategy Games', 'Simulation Games', 'Puzzle Games', 'Adventure Games',
      'Game Industry', 'Game Marketing', 'Game Monetization', 'Game Communities'
    ]
  },
  {
    name: 'Internet & Digital Culture',
    topics: [
      'Social Media', 'Digital Communication', 'Online Communities', 'Internet Culture',
      'Memes', 'Viral Content', 'Content Creation', 'Influencer Culture',
      'Digital Identity', 'Online Privacy', 'Digital Wellness', 'Screen Time',
      'Digital Literacy', 'Information Overload', 'Fake News', 'Misinformation',
      'Online Safety', 'Cyberbullying', 'Digital Rights', 'Net Neutrality',
      'Platform Economy', 'Creator Economy', 'Digital Nomadism', 'Remote Culture',
      'Online Learning', 'Digital Entertainment', 'Streaming Culture', 'Digital Transformation'
    ]
  },
  {
    name: 'Emerging Technologies',
    topics: [
      'Virtual Reality', 'Augmented Reality', 'Mixed Reality', 'Extended Reality',
      'Internet of Things', '5G Technology', '6G Research', 'Edge Computing',
      'Quantum Technology', 'Biotechnology', 'Nanotechnology', '3D Printing',
      'Advanced Robotics', 'Brain-Computer Interfaces', 'Wearable Technology', 'Smart Materials',
      'Gene Editing', 'CRISPR', 'Synthetic Biology', 'Digital Twins',
      'Autonomous Vehicles', 'Drones', 'Smart Cities', 'Space Technology',
      'Clean Technology', 'Energy Technology', 'Food Technology', 'Agricultural Technology'
    ]
  }
];

// Flatten all topics with their categories for easy access
export const allTopics: { topic: string; category: string }[] = topicCategories.flatMap(
  (category) => category.topics.map((topic) => ({ topic, category: category.name }))
);

// Get total count
export const totalTopicsCount = allTopics.length;

// Search topics
export function searchTopics(query: string): { topic: string; category: string }[] {
  const lowerQuery = query.toLowerCase();
  return allTopics.filter(
    (item) =>
      item.topic.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
  );
}

// Get topics by category
export function getTopicsByCategory(categoryName: string): string[] {
  const category = topicCategories.find((c) => c.name === categoryName);
  return category ? category.topics : [];
}

// Get all category names
export function getAllCategories(): string[] {
  return topicCategories.map((c) => c.name);
}
