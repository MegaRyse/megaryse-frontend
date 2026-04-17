import type { UniversityCourseContent } from '../../types/universityCourseContent'

const AMITY_PAYMENT_MODES = 'No-cost EMI available'

/** Per-course content for Amity University Online — keys match `toCourseSlug(course.shortName)` */
export const amityUniversityCourseContent: Record<string, UniversityCourseContent> = {
  'b-com': {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'The Bachelor of Commerce (B.Com) and Bachelor of Commerce (Honours) are designed to provide students with a strong foundational understanding of business, economics, and commercial practices. These programs are structured to equip students with essential knowledge for roles in the corporate, financial, and organizational sectors, blending theoretical academic learning with professional skill development to prepare graduates for various career paths in the global marketplace.',
    highlights: [
      'UGC-entitled online degree program with a duration of 3 years (6 semesters).',
      'Flexible learning through live sessions, self-learning materials, discussion forums, and online exams.',
      'Industry-designed curriculum that delivers technical excellence and supplements professional skills.',
      'Includes a host of skill enhancement and ability enhancement courses alongside core subjects.',
      'Incorporates project work that allows students to analyse problems and propose actions for real-world situations.',
      'Global learning environment with access to diverse digital resources, faculty, and industry mentorship.',
      'Innovative learning methodology with dedicated program managers and additional live sessions for career success.',
    ],
    specializations: [
      'B.Com (General): This program provides a broad foundation in commerce, business principles, and finance, preparing students for diverse roles in corporate management, financial institutions, and accounting firms.',
      'B.Com (Honours): This program offers an in-depth study of commercial disciplines, providing a robust foundation in business and economics. It is designed to foster a comprehensive understanding of financial, economic, and organizational environments.',
      'B.Com with Specialization in International Finance & Accounting: This specialization is tailored for students focusing on the global aspects of financial management and accounting standards. It prepares learners for careers requiring proficiency in international financial reporting, accounting practices, and global business operations.',
    ],
    eligibility: [
      'To be eligible for admission, students with Indian education must have completed 10 years of formal schooling (10th Class Certificate) and 12 years of formal schooling (12th Class Certificate), while students with foreign education must possess O level and A level certificates representing 10 and 12 years of formal schooling, respectively—note that diplomas are not acceptable in these cases—and all foreign students are further required to provide a Certificate of Equivalence from the Association of Indian Universities.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee: 'BCOM: ₹1,15,000 | BCOM - HONS: ₹1,75,000 | BCOM - IF & A: ₹2,75,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  bba: {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'The Bachelor of Business Administration (BBA) is a 3-year undergraduate programme designed to build a strong foundation in business management, leadership, and entrepreneurship. The programme combines core business subjects such as management, marketing, finance, and operations with industry-oriented learning to develop practical business skills. Through case studies, live sessions, projects, and industry exposure, learners gain the knowledge required to pursue careers in corporate management, entrepreneurship, consulting, and emerging business domains. Students can choose from multiple specialization pathways, including industry-integrated programmes developed with leading organizations such as HCLTech and KPMG, or domain-focused programmes like Travel & Tourism Management, depending on their career goals.',
    highlights: [
      'UGC-entitled online degree with global recognition.',
      '3-year industry-focused curriculum covering core business and management concepts.',
      'Multiple specialization options including Travel & Tourism Management, Data Analytics (HCLTech), and Business Analytics Certification (KPMG).',
      'Industry partnerships providing practical exposure and career-oriented learning.',
      'Access to live online classes, recorded lectures, webinars, and industry interactions.',
      'Learning from experienced faculty and corporate experts.',
      'Career services and placement support to help students prepare for industry roles.',
      'Opportunity to build skills in leadership, analytics, entrepreneurship, and strategic decision-making.',
    ],
    specializations: [
      'BBA (General): The General BBA programme provides a comprehensive understanding of core business functions including marketing, finance, human resources, operations, and entrepreneurship. It is ideal for students who want a broad management education before specializing later in their careers or pursuing postgraduate studies such as an MBA.',
      'BBA with Specialization in Data Analytics (HCLTech): Offered in collaboration with HCLTech, this specialization combines business management with data analytics skills. Students learn how to analyze business data, interpret insights, and use analytical tools to support decision-making in organizations. The programme also provides exposure to industry practices and career opportunities in data-driven business roles such as business analyst, data analyst, and digital strategy professional.',
      'BBA with Professional Certificate in Business Analytics (KPMG): This programme includes a 13-week Professional Certificate in Business Analytics in academic partnership with KPMG. Students gain practical exposure to data analytics concepts, AI, and business intelligence techniques used in consulting and corporate environments. The programme also offers opportunities for industry experience and helps learners build skills relevant for careers in consulting, analytics, and business strategy.',
    ],
    eligibility: [
      'To be eligible for admission, students with Indian education must have completed 10 years of formal schooling (10th Class Certificate) and 12 years of formal schooling (12th Class Certificate), while students with foreign education must possess O level and A level certificates representing 10 and 12 years of formal schooling, respectively - note that diplomas are not acceptable in these cases - and all foreign students are further required to provide a Certificate of Equivalence from the Association of Indian Universities.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee: 'BBA: ₹1,99,000 | BBA - HCLTECH_DATA_ANALYTICS: ₹2,50,000 | BBA - KPMG_BAP: ₹2,30,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  bca: {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'The Bachelor of Computer Applications (BCA) is a 3-year (6 semesters) UGC-entitled online degree program designed to provide a strong foundational understanding of computer science and its various business applications. The program is structured to bridge the gap between theoretical academic learning and practical industry requirements, equipping students with the essential technical and professional skills needed to excel in the global IT and software development sectors.',
    highlights: [
      'UGC-Entitled Online Degree: A recognized 3-year program (6 semesters) that holds the same academic value as a traditional campus degree.',
      'Industry-Aligned Curriculum: Designed by eminent faculty and industry professionals from partners like HCLTech, KPMG, and TCS iON to ensure technical excellence.',
      'Flexible Learning Environment: Students can access content on an easy-to-use Learning Management System (LMS) with live interactive sessions and recorded lectures available anytime, anywhere.',
      'AI-Powered Support: Access to "AI-PROF. AMI," an AI assistant available 24/7 for instant doubt-clearing and academic guidance.',
      'Career Readiness & Placement: Included detailed placement assistance, virtual job fairs, and 1:1 industry mentorship to help students transition into professional roles.',
      'Global Recognition: Accredited by international bodies including WASC (USA), QAA (UK), and WES (Canada/USA), ensuring the degree is respected globally.',
    ],
    specializations: [
      'BCA (General): This program focuses on the core concepts of computer applications, software development, and programming. It provides a versatile education in IT, covering essential areas such as database management, networking, and web technologies to prepare students for a wide range of roles in the technology industry.',
      'BCA with Specialization in Data Analytics (in partnership with TCS iON): This industry-endorsed program is designed to develop expertise in managing and analyzing large datasets to drive business decisions. Key Focus: Students learn advanced statistical techniques, data visualization, and machine learning using industry-standard tools. Learning Outcomes: Prepares graduates for roles like Data Analysts and Business Intelligence specialists through a curriculum aligned with current market demands.',
      'BCA with Specialization in Cloud & Security (in partnership with TCS iON): This specialization addresses the critical need for secure cloud infrastructure in the modern digital economy. Key Focus: The curriculum covers cloud computing architecture, virtualization, and comprehensive cybersecurity measures. Learning Outcomes: Equips students to design and protect cloud-based systems, targeting roles such as Cloud Architects and Security Analysts.',
      'BCA with Specialization in Software Engineering (in partnership with HCLTech): Offered in collaboration with HCLTech, this program focuses on the technical excellence required for the entire software development lifecycle. Key Focus: Includes specialized training in modern software architecture, agile methodologies, and advanced software testing. Learning Outcomes: Aims to produce industry-ready software engineers capable of building scalable and high-quality software solutions.',
      'BCA with Professional Certificate in Applied Data Engineering (in partnership with KPMG): This combination offers a standard BCA degree supplemented by an intensive 14-week professional certificate from KPMG. Key Focus: It emphasizes the engineering side of data, including data pipelines, data processing, and cloud-native solutions. Learning Outcomes: Graduates gain specialized skills for roles such as Data Engineers and Big Data Specialists, with the added benefit of industry-recognized certification.',
      'BCA with Specialization in Data Engineering (in partnership with HCLTech): Designed in partnership with HCLTech, this specialization focuses on the technical aspects of data infrastructure and processing. Key Focus: The curriculum centers on building and maintaining data pipelines, storage solutions, and large-scale data processing systems. Learning Outcomes: It prepares students for specialized careers as Data Engineers, ensuring they are proficient in modern data management and engineering practices used by global tech leaders.',
    ],
    eligibility: [
      'To be eligible for admission, students with Indian education must have completed 10 years of formal schooling (10th Class Certificate) and 12 years of formal schooling (12th Class Certificate), while students with foreign education must possess O level and A level certificates representing 10 and 12 years of formal schooling, respectively - note that diplomas are not acceptable in these cases - and all foreign students are further required to provide a Certificate of Equivalence from the Association of Indian Universities.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee:
        'BCA: ₹1,75,000 | BCA - HCLTECH_DATA_ENGINEERING: ₹2,50,000 | BCA - HCLTECH_SOFTWARE_ENGINEERING: ₹2,50,000 | BCA - TCSION_CLOUDSECURITY: ₹2,50,000 | BCA - TCSION_DATAANALYTICS: ₹2,50,000 | BCA - KPMG_ADE: ₹2,30,000 | BCA - FINTECH: ₹2,75,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  ba: {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'The Bachelor of Arts (BA) is a comprehensive undergraduate program designed for students who are creatively inclined and seeking to develop a deep understanding of human society, culture, and communication. The program emphasizes critical thinking, extensive research, and the development of unique perspectives through academic rigor and professional guidance. It is structured to provide students with the patience and hard work required to excel in fields ranging from journalism to social sciences.',
    highlights: [
      'UGC-Entitled Degree: A recognized online degree program that holds equal academic value to traditional campus-based programs.',
      'Global Accreditations: Accredited by prestigious international bodies including WASC (USA), QAA (UK), and WES (Canada/USA).',
      'Flexible Learning: Features an easy-to-use Learning Management System (LMS) accessible anytime and anywhere, allowing for a hassle-free educational experience.',
      'Interactive Pedagogy: Includes live and interactive lectures by expert faculty, supplemented by regular webinars from industry leaders.',
      'Career Support: Offers dedicated placement drives, virtual job fairs, and career assistance to help students transition into the professional world.',
      'Web Proctored Exams: Provides students the freedom and convenience to take exams from their own space with integrity.',
      'Strong Alumni Network: Graduates are working at top global organizations such as Google, Microsoft, IBM, and KPMG.',
    ],
    specializations: [
      'B.A. (General): This program offers a broad-based education across multiple disciplines, allowing students to explore various subjects in the humanities and social sciences. It is designed to provide a versatile foundation for diverse career paths.',
      'B.A. (General) - Hindi Medium: This version of the BA General program is specifically designed for students who prefer to pursue their undergraduate studies with Hindi as the primary medium of instruction, covering core subjects like Sociology, Business Communication, and Environmental Studies in Hindi.',
      'B.A. in Journalism & Mass Communication (JMC): Focus: It provides insights into fundamental aspects of reporting, editing, and the aesthetics of page design. Outcome: The program prepares students for professional roles in print, broadcast, and digital media by blending theoretical knowledge with practical communication skills.',
      'B.A. with Specialization in English: This elective focuses on the intensive study of literature and language. Focus: The curriculum covers English poetry from Chaucer to Blake, the history of English literature, and drama from the Elizabethan to the Restoration age. Outcome: It develops advanced analytical and linguistic skills through the study of diverse literary periods and genres.',
      'B.A. with Specialization in Sociology: This specialization explores the complexities of human behavior and social structures. Focus: Students study the sociology of deviance, social organization, and changing profiles of crime and punishment. Outcome: It equips students with excellent analytical skills and prepares them for roles in social work, research, and policy analysis.',
      'B.A. with Specialization in Political Science: This elective focuses on political theory and the functioning of government systems. Focus: Key learning areas include Indian political thought (Kautilya, Gandhi, Nehru), political obligations, and western political thinkers like Plato and Aristotle. Outcome: It generates awareness of distinctive features of political thought and its application in modern governance.',
      'B.A. in Regional Languages (Malayalam, Tamil, Telugu, Kannada): These programs are designed for students to gain proficiency and academic depth in their respective regional languages. Focus: They emphasize the cultural and linguistic heritage of the language, along with creative writing and research. Outcome: Graduates are equipped for careers in translation, education, and regional media among others.',
    ],
    eligibility: [
      'To be eligible for admission, students with Indian education must have completed 10 years of formal schooling (10th Class Certificate) and 12 years of formal schooling (12th Class Certificate), while students with foreign education must possess O level and A level certificates representing 10 and 12 years of formal schooling, respectively - note that diplomas are not acceptable in these cases - and all foreign students are further required to provide a Certificate of Equivalence from the Association of Indian Universities.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee:
        'Bachelor of Arts (BA): ₹1,15,000 | Bachelors of Arts (General) Hindi Medium: ₹90,000 | Bachelor of Arts (BA) Journalism and Mass Communication: ₹1,90,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  mba: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'The Master of Business Administration (MBA) is a prestigious postgraduate programme designed to empower students with industry-centric skills, leadership capabilities, and a deep understanding of core business management principles. It is structured to bridge the gap between academic pedagogy and real-world corporate demands, offering a flexible "Anytime, Anywhere" learning experience suitable for both fresh graduates and working professionals.',
    highlights: [
      'UGC-Entitled Degree: A fully recognized programme, ensuring the qualification is held at par with traditional campus-based degrees.',
      'Global Accreditations: Accredited by prestigious international bodies, including WASC (USA), QAA (UK), and ACBSP (USA), ensuring worldwide acceptance.',
      'Flexible Learning: Features an advanced Learning Management System (LMS) that allows students to access course materials, audiobooks, and interactive sessions anytime and anywhere.',
      'Industry-Oriented Pedagogy: Combines live online lectures from world-class faculty with expert-led webinars and real-world case studies to ensure practical learning.',
      'Robust Career Services: Offers dedicated placement support, resume-building workshops, and access to a vast global alumni network working at top-tier organizations.',
      'Remote Assessment: Utilizes a secure, web-proctored exam system, providing the convenience of taking examinations from any location while maintaining academic integrity.',
      'Continuous Support: Students benefit from dedicated academic advisors and technical support, ensuring a seamless and productive educational journey.',
    ],
    specializations: [
      'MBA (General): This programme offers a comprehensive foundation in business administration, covering essential managerial functions. It is designed to provide a versatile skillset, enabling graduates to adapt to various roles across different industries. Focus: Core business management, strategic decision-making, and organizational leadership. Outcome: Prepares students for diverse career paths by providing a broad-based managerial perspective.',
      'MBA in Hospital and Healthcare Management (HHM): Designed in collaboration with Med varsity and Apollo Hospitals, this programme addresses the unique challenges of the healthcare sector. Focus: Healthcare leadership, hospital operations, healthcare innovation, and patient-centered management. Outcome: Equips professionals with the strategic skills necessary to manage modern healthcare facilities and improve service delivery.',
      'MBA in International Finance (ACCA): This specialised programme is accredited by ACCA (UK), providing a global perspective on financial management. Focus: International financial reporting, advanced financial management, and global fiscal strategies. Outcome: Prepares students for senior finance roles in multinational corporations with a globally recognized qualification.',
      'MBA in International Business Management: This programme explores the complexities of operating in a global marketplace, with a strong focus on currency and trade. Focus: International currency management, export/import procedures, and managing risks associated with global cross-border transactions. Outcome: Develops expertise in international trade policies and global market navigation.',
      'MBA in Hospitality and Tourism Management: This programme provides deep insights into the management of hospitality services and the tourism industry. Focus: Tourism infrastructure planning, hospitality service standards, and the socio-cultural heritage of India as a tourism product. Outcome: Prepares graduates for leadership roles in the travel, tourism, and hospitality sectors.',
      'MBA in Retail Management: Focuses on the operational and strategic aspects of the retail industry, including luxury and mass-market segments. Focus: Merchandising, category management, inventory control, and retail branding decisions. Outcome: Provides the analytical and operational skills needed to manage retail chains and luxury brands.',
      'MBA in Production and Operations Management: This programme develops an understanding of the end-to-end supply chain and production processes. Focus: Procurement, logistics, vendor management, and the latest trends in supply chain technology. Outcome: Equips students with the analytical tools to manage complex manufacturing and service delivery operations.',
      'MBA in Petroleum & Natural Gas Management: Focuses on the dynamics of the oil and gas industry, from exploration to refining. Focus: Oil and gas value chains, refining processes, petrochemical industry management, and market cycles. Outcome: Prepares professionals for the highly technical and strategic demands of the energy sector.',
      'MBA in Marketing & Sales Management: Explores the psychological and methodological approaches that drive consumer behaviour and sales. Focus: Consumer research, brand attitude, behavioral learning theories, and service marketing. Outcome: Develops the ability to create impactful marketing strategies based on deep consumer insights.',
      'MBA in Insurance Management: Concentrates on the fundamental principles and operational challenges of the insurance sector. Focus: Life and general insurance underwriting, risk management, claims procedures, and regulatory compliance. Outcome: Develops expertise in insurance operations, product management, and risk assessment.',
      'MBA in General Management: Focuses on providing a holistic view of organizational management, ensuring students are well-versed in all functional areas of a business. Focus: Integrated business operations, general administration, and cross-functional leadership. Outcome: Enables graduates to pursue versatile roles in management, operations, and consulting across diverse industries.',
      'MBA in Dual Specialization: Allows students to gain expertise in two distinct areas of management simultaneously, broadening their career pathways. Focus: Combining two complementary management domains to foster both academic breadth and practical, multi-disciplinary skills. Outcome: Prepares students for versatile roles by equipping them with a unique, combined skillset.',
      'MBA in Human Resource Management: Equips students with the expertise needed to manage an organization\'s most valuable asset: its people. Focus: Recruitment, selection, retention strategies, job analysis, and strategic human resource management. Outcome: Prepares professionals for roles in HR planning, staffing, and organizational development.',
      'MBA in HR Analytics: An immersive program for professionals looking to leverage data-driven technologies in human resources. Focus: Utilizing data to improve HR decision-making, predictive analysis, and talent management optimization. Outcome: Prepares students for advanced roles in HR consulting, predictive analysis, and strategic HR business partnership.',
      'MBA in Finance & Accounting Management: Focuses on the financial health of an organization and the use of accounting data for managerial decision-making. Focus: Cost and management accounting, strategic financial management, and international project financing. Outcome: Provides the analytical tools necessary for effective financial planning, control, and investment decision-making.',
      'MBA in Global Finance Market: Analyzes the environment of international finance and its impact on global business operations. Focus: Foreign exchange markets, risk management strategies, international financial markets, and commodity trading. Outcome: Prepares graduates for roles that require navigating complex global financial systems and competitive environments.',
      'MBA in Digital Marketing: Provides a comprehensive perspective on the modern digital marketing ecosystem. Focus: Digital strategy, consumer behavior in digital spaces, and the application of new media for branding and sales. Outcome: Prepares students for leadership roles in digital branding, SEO/SEM management, and overall marketing strategy.',
      'MBA in Digital Entrepreneurship: Designed for aspiring entrepreneurs and business leaders to understand the intersection of technology and business creation. Focus: Entrepreneurial mindset, business planning for digital ventures, and innovation in digital business models. Outcome: Empowers students to start their own ventures or drive innovation within established organizations.',
      'MBA in Entrepreneurship & Leadership Management: Focuses on the preparation, financing, and appraisal of projects within a liberalized and competitive market. Focus: Project management, business planning, family business dynamics, and leadership theories. Outcome: Develops the capacity to lead and manage ventures, drive organizational change, and navigate complex business environments.',
      'MBA in Data Science: A comprehensive program designed for those who want to master data-driven technologies. Focus: Data modeling, algorithmic analysis, business intelligence, and big data engineering. Outcome: Prepares students for roles in data science, machine learning, and advanced business analytics.',
      'MBA in Information Technology Management: Focuses on the strategic application of technology within business frameworks to improve efficiency and decision-making. Focus: IT project management, software development life cycles, and business process modeling. Outcome: Equips graduates to lead technology initiatives and manage the integration of IT into business operations.',
      'MBA in Business Analytics: Focuses on the use of statistical tools and data modeling to solve complex business problems. Focus: Data visualization, machine learning, and advanced analytics for business strategy. Outcome: Prepares students for analytical roles that drive organizational performance through data-informed insights.',
    ],
    eligibility: [
      'Domestic Students: Fresh graduates and working professionals are eligible to apply. Candidates must have completed graduation in any discipline with at least 40% marks in the last qualifying examination. Applicants with less than 40% marks may still be considered if they pass a qualifying test conducted by the university. English language proficiency is mandatory for admission.',
      'International Students: Fresh graduates and working professionals are eligible to apply. Candidates who have completed their degree from a foreign university must submit a certificate of equivalence issued by the Association of Indian Universities (AIU) to be considered for admission.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee:
        'MBA: ₹2,25,000 | MBA - ACCA: ₹3,29,000 | MBA - Dual Specialization: ₹3,29,000 | MBA - HHM: ₹3,29,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  mca: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'The Master of Computer Applications (MCA) is a UGC-entitled online degree programme designed to provide a comprehensive understanding of advanced computer science concepts and their practical applications in the industry. It is structured to suit both graduate students and working professionals, offering an "anytime, anywhere" education experience through intensive corporate interaction and industry-oriented teaching delivered by eminent corporate experts and world-class faculty.',
    highlights: [
      'UGC-Entitled Online Degree: A recognised programme that holds the same academic value as a traditional campus degree.',
      'Industry-Aligned Curriculum: Designed by eminent faculty and industry professionals from partners like HCLTech and TCS iON to ensure technical excellence.',
      'Flexible Learning Environment: Students have access to an easy-to-use Learning Management System (LMS) with live interactive sessions, recorded lectures, and face-to-face interactions.',
      'Career Readiness & Placement: Includes remote internship opportunities, dedicated placement assistance, and 1:1 sessions with industry experts to help students transition into professional roles.',
      'Global Recognition: The programmes are accredited by international bodies including WASC (USA), QAA (UK), and WES (Canada/USA), ensuring the degree is respected globally.',
    ],
    specializations: [
      'MCA (General): The general MCA programme provides a strong foundation in computer applications, software development, and core IT concepts. It is designed to meet UGC criteria and maintains parity with traditional campus-based programmes.',
      'MCA in Blockchain Technology: This is a super-specialised, 24-month programme for ambitious professionals seeking a career in Blockchain. Key Focus: It provides a thorough knowledge of Blockchain applications, aiming to familiarise learners with its implementation, management, and real-world applications to meet current industry demands. Learning Outcomes: Students develop skills to build practical Blockchain applications and craft winning business strategies, with the added benefit of certification from eCornell.',
      'MCA with Specialisation in AR & VR (in partnership with TCS iON): This industry-endorsed programme is designed to develop expertise in Augmented Reality and Virtual Reality. Key Focus: Incorporates industry participation to enhance in-demand skills required in the age of Industry 4.0. Learning Outcomes: Prepares students to achieve career success through industry-oriented teaching and intensive corporate interaction.',
      'MCA with Specialisation in Machine Learning (in partnership with TCS iON): An industry-endorsed programme focused on building technical expertise in Machine Learning. Key Focus: The curriculum is created with industry participation to ensure it aligns with current market demands and fosters in-demand technical skills. Learning Outcomes: Designed to enhance employability and equip students with the knowledge and skills necessary for the professional world.',
      'MCA with Specialisation in Machine Learning & AI: A unique programme fostering innovation through advanced expertise in Machine Learning and Deep Learning techniques. Key Focus: Aims to develop outstanding expertise in AI and ML technologies in the next generation of leaders. Learning Outcomes: Provides a deep understanding of complex algorithms and their implementations, preparing learners for advanced roles in the field.',
      'MCA with Specialisation in Cyber Security (in partnership with HCLTech): Designed in partnership with HCLTech, this programme provides industry-centric skills in the cybersecurity domain. Key Focus: Emphasizes empowering students with the knowledge and expertise to achieve success confidently through lifelong learning and values. Learning Outcomes: Prepares graduates for professional success by bridging the gap between academic knowledge and industry-centric cybersecurity requirements.',
      'MCA with Specialisation in Software Engineering (in partnership with HCLTech): This programme is offered in collaboration with HCLTech and focuses on delivering industry-oriented technical skills. Key Focus: Incorporates corporate interaction and industry-oriented teaching to ensure students are well-prepared for the professional software engineering landscape. Learning Outcomes: Aims to empower students with industry-centric skills to achieve success in the competitive software development sector.',
    ],
    eligibility: [
      'Domestic Students: Fresh graduates and working professionals are eligible to apply. Candidates must have completed graduation in any discipline with at least 40% marks in the last qualifying examination. Applicants with less than 40% marks may still be considered if they pass a qualifying test conducted by the university. English language proficiency is mandatory for admission.',
      'International Students: Fresh graduates and working professionals are eligible to apply. Candidates who have completed their degree from a foreign university must submit a certificate of equivalence issued by the Association of Indian Universities (AIU) to be considered for admission.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee:
        'Master of Computer Applications (MCA): ₹1,99,000 | Master of Computer Applications (MCA) with Specialization in Cyber Security: ₹2,75,000 | Master of Computer Applications (MCA) with Specialization in Software Engineering: ₹2,75,000 | Master of Computer Applications (MCA) with Specialization in Machine Learning and Artificial Intelligence: ₹2,75,000 | MCA with Specialization in Financial Technology and AI: ₹2,75,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  ma: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'The Master of Arts (MA) is a postgraduate academic degree programme designed to provide advanced knowledge and specialised understanding in fields such as psychology, media studies, and public policy. These programmes are structured to bridge theoretical academic frameworks with practical, industry-oriented applications, catering to both fresh graduates and working professionals. By offering flexible, UGC-entitled online learning environments, the MA programme equips students with the critical thinking, research, and professional skills necessary to navigate complex societal issues and excel in their respective careers.',
    highlights: [
      'UGC-Entitled Degree: A recognised online postgraduate programme aligned with modern academic standards.',
      'Flexible Online Learning Environment: Designed for both fresh graduates and working professionals through an anytime, anywhere digital learning model.',
      'Academic + Industry Integration: Bridges theoretical frameworks with practical, industry-oriented applications across media and governance.',
      'Research and Critical Thinking Focus: Builds advanced analytical, research, and professional competencies for complex societal and policy challenges.',
      'Career-Oriented Progression: Prepares learners for domain-specific roles in journalism and public governance.',
    ],
    specializations: [
      'Master of Arts (Journalism & Mass Communication): The Master of Arts in Journalism & Mass Communication is a UGC-entitled online degree programme. It is designed to provide a holistic education in media studies, enabling students including those from non-journalism backgrounds to understand mass communication theories, the normative theories of the press, and media models. Programme Highlights: UGC-Entitled Online Degree - A recognised online programme. Comprehensive Curriculum - Covers areas such as media theory, news gathering, investigative journalism, and digital marketing. Global Accreditations - Accredited by bodies including WASC (USA), QAA (UK), and WES (Canada/USA). Flexible Learning - Features live, interactive lectures by expert faculty, an easy-to-use Learning Management System (LMS), and web-proctored exams.',
      'Master of Arts (Public Policy & Governance): The Master of Arts in Public Policy & Governance is a UGC-entitled online degree programme. It is structured to serve both working professionals seeking career advancement and lifelong learners. Programme Highlights: UGC-Entitled Online Degree - A recognised programme. Global Accreditations - Accredited by WASC (USA), QAA (UK), and WES (Canada/USA). Supportive Learning Environment - Students have access to a digital platform with interactive online courses, digital libraries, and forums for academic discourse. Flexible Access - The programme is designed to accommodate needs through state-of-the-art technology, enabling learners to transcend geographical boundaries.',
    ],
    eligibility: [
      'Domestic Students: Fresh graduates and working professionals are eligible to apply. Candidates must have completed graduation in any discipline with at least 40% marks in the last qualifying examination. Applicants with less than 40% marks may still be considered if they pass a qualifying test conducted by the university. English language proficiency is mandatory for admission.',
      'International Students: Fresh graduates and working professionals are eligible to apply. Candidates who have completed their degree from a foreign university must submit a certificate of equivalence issued by the Association of Indian Universities (AIU) to be considered for admission.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee: 'MA - JMC: ₹1,90,000 | MA - PPG: ₹1,50,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  mcom: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'The Master of Commerce (M.Com) is a postgraduate degree programme designed to provide students with an in-depth understanding of advanced commerce, finance, and management principles. The programme is structured to bridge the gap between theoretical financial knowledge and practical, real-world application, equipping students with the essential analytical and professional skills needed to excel in sectors such as corporate finance, banking, and capital markets.',
    highlights: [
      'UGC-Entitled Online Degree: A recognised postgraduate programme that holds the same academic value as a traditional campus degree.',
      'Industry-Aligned Curriculum: Designed by eminent faculty and industry professionals to ensure graduates possess skills relevant to modern financial and commerce landscapes.',
      'Flexible Learning Environment: Students have access to an easy-to-use Learning Management System (LMS) with live interactive sessions, recorded lectures, and digital resources available anytime, anywhere.',
      'Career Readiness & Placement: Includes access to virtual job fairs, career counselling, and placement assistance to help students transition into professional roles.',
      'Global Recognition: Accredited by international bodies including WASC (USA), QAA (UK), and WES (Canada/USA), ensuring the degree is respected globally.',
    ],
    specializations: [
      'M.Com (Financial Management): This programme is designed to help students master the intricacies of financial theory and its practical implementation. Key Focus: It allows students to customise their learning track to fit specific areas such as corporate finance, banking, or capital markets. Learning Outcomes: Prepares graduates with the experience and knowledge necessary to integrate financial theory with real-world applications, supporting career progression in finance roles.',
      'M.Com with Specialisation in FinTech: This programme provides a comprehensive approach, making students proficient in commerce, finance, and technology. Key Focus: It centres on a consumer-centric approach, teaching students to view financial landscapes from both an entrepreneur’s and a customer’s perspective. Learning Outcomes: Equips students for specialised careers in the rapidly evolving financial technology sector, with the added benefit of certification from Wharton (University of Pennsylvania).',
    ],
    eligibility: [
      'Domestic Students: Fresh graduates and working professionals are eligible to apply. Candidates must have completed graduation in any discipline with at least 40% marks in the last qualifying examination. Applicants with less than 40% marks may still be considered if they pass a qualifying test conducted by the university. English language proficiency is mandatory for admission.',
      'International Students: Fresh graduates and working professionals are eligible to apply. Candidates who have completed their degree from a foreign university must submit a certificate of equivalence issued by the Association of Indian Universities (AIU) to be considered for admission.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee: 'Master of Commerce (M.Com) in Financial Management: ₹1,50,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  'msc-ds': {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'The Master of Science (M.Sc) is a postgraduate degree programme designed to provide advanced knowledge and specialised expertise in technical and analytical fields. The programme is structured to build a strong foundation for analytical and leadership roles, bridging the gap between theoretical research and practical industry application to equip students with the essential skills needed to excel in various sectors. This programme is specifically designed to prepare students for a career in high-demand analytical and leadership roles across various industries. Key Focus: The curriculum focuses on equipping students with advanced skills in data analysis, statistical modeling, and machine learning techniques to derive actionable insights from complex datasets. Learning Outcomes: Prepares graduates for professional roles in data science and analytics, ensuring they are capable of driving data-informed business decisions.',
    highlights: [
      'UGC-Entitled Online Degree: A recognised postgraduate programme that holds significant academic value and aligns with modern educational standards.',
      'NAAC A+ Accredited: The institution holds a prestigious NAAC A+ accreditation, ensuring high-quality academic standards and institutional excellence.',
      'Flexible Learning Environment: Students have access to a top-notch online learning experience with diverse mediums, including recorded lectures, audiobooks, physical books, and e-books, accessible anytime, anywhere.',
      'AI-Powered Support: Includes access to "AI-PROF. AMI," an AI assistant powered by ChatGPT-4 for 24/7 academic guidance and doubt-clearing.',
      'Career Readiness & Placement: Offers dedicated career services and placement assistance through 500+ hiring partners, along with 1:1 industry mentorship to facilitate professional growth.',
      'Interactive Learning: Engages students in a dynamic environment through continuous faculty interaction, dedicated doubt-clearing sessions, and remote proctored examinations for convenience.',
    ],
    keyTopics: [
      'Data Analysis',
      'Machine Learning',
      'Statistical Modeling',
      'Business Intelligence',
    ],
    eligibility: [
      'Domestic Students: Fresh graduates and working professionals are eligible to apply. Candidates must have completed graduation in any discipline with at least 40% marks in the last qualifying examination. Applicants with less than 40% marks may still be considered if they pass a qualifying test conducted by the university. English language proficiency is mandatory for admission.',
      'International Students: Fresh graduates and working professionals are eligible to apply. Candidates who have completed their degree from a foreign university must submit a certificate of equivalence issued by the Association of Indian Universities (AIU) to be considered for admission.',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee: 'Master of Science (M.Sc) Data Science: ₹2,75,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
}
