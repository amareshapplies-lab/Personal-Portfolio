export const resumeData = {
  personal: {
    name: "Amaresh D R",
    title: "AI Developer | Generative AI & ML Engineer | Data & Software Engineering",
    location: "Bangalore, Karnataka (Open to relocate)",
    phone: "+91 9486342674",
    email: "amareshapplies@gmail.com",
    linkedin: "https://www.linkedin.com/in/amaresh-dr-551445433/",
    linkedinHandle: "amaresh-dr-551445433",
    github: "https://github.com/amaresh-dr",
    status: "Available for AI/ML & Data Engineering Roles",
    experienceYears: "1+ Years",
    resumeFileName: "Amaresh_DR_Resume.pdf",
    resumeUrl: "/Amaresh_DR_Resume.pdf",
    tagline: "Building scalable, explainable multimodal AI/ML & Generative AI solutions for production enterprise systems.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    stats: [
      { label: "ML & GenAI Models Deployed", value: "12+" },
      { label: "Multimodal Data Pipelines", value: "8+" },
      { label: "Detection Accuracy Lift", value: "+34%" },
      { label: "Academic CGPA", value: "8.00/10" }
    ]
  },

  summary: `Data Scientist / AI-ML Engineer with 1+ year of professional, non-internship experience building and deploying machine learning and Generative AI solutions on multimodal data (image, sensor, clinical, tabular, time-series). Skilled in the end-to-end data science lifecycle: data ingestion and pipeline automation, exploratory data analysis, feature engineering, model development (Scikit-learn, PyTorch), and Explainable AI (SHAP) for decision-support systems. Hands-on with deep learning architectures (CNN, Vision Transformers, LSTM, Transformers) and Generative AI techniques (GANs, VAEs, Diffusion Models, LLMs), including diffusion-based data augmentation for imbalanced datasets.`,

  experience: [
    {
      id: "lyceum",
      role: "Research Analyst / Technical Programmer",
      company: "Researcher Lyceum Private Limited",
      location: "India",
      period: "Jul 2025 – Present",
      type: "Full-time",
      badge: "Current Role",
      highlights: [
        "Designed and coded scalable, automated data pipelines to ingest, clean, and organize multimodal data (image, sensor, clinical, tabular), reducing manual preprocessing effort for downstream ML systems.",
        "Built and validated ML models to run predictions across multi-source, high-volume datasets, conducting EDA to uncover anomalies and trends supporting root-cause analysis.",
        "Developed and shipped multimodal deep learning models for fetal health prediction by integrating imaging data with structured clinical records; applied Explainable AI (SHAP) for interpretable decision-support.",
        "Engineered a Generative AI-based defect detection framework using diffusion-based data augmentation and Vision Transformers (ViT), significantly improving detection accuracy on imbalanced datasets.",
        "Implemented physics-aware transformer architectures for materials science research, predicting material stability from structured/sensor data.",
        "Optimized model performance through hyperparameter tuning, model comparison, and architecture refinement using PyTorch, Scikit-learn, OpenCV, Pandas, and NumPy in agile delivery cycles."
      ],
      skills: ["PyTorch", "Vision Transformers", "Diffusion Models", "SHAP", "Scikit-learn", "OpenCV", "SQL", "Multimodal Pipelines"]
    },
    {
      id: "networkz",
      role: "Full Stack Developer Intern",
      company: "Networkz Systems",
      location: "India",
      period: "May 2023 – Jul 2023",
      type: "Internship",
      badge: "Full Stack",
      highlights: [
        "Designed, coded, and shipped responsive full-stack web applications end-to-end (HTML, CSS, JavaScript front end; Python/Django back end) within a 2-person agile team.",
        "Built foundational internal dashboards and automation tooling, operating in fast-paced iterations under tight timelines."
      ],
      skills: ["Python", "Django", "JavaScript", "HTML/CSS", "REST APIs", "Agile"]
    }
  ],

  projects: [
    {
      id: "defect-detection",
      title: "Generative AI-Based Visual Defect Detection",
      category: "Generative AI & Computer Vision",
      subtitle: "Automated Quality Inspection using ViT & Diffusion Models",
      period: "2025",
      featured: true,
      description: "Built an automated visual defect/anomaly detection system using Vision Transformers (ViT) and diffusion-based synthetic data augmentation to solve extreme class imbalance in industrial component quality inspection.",
      metrics: {
        accuracy: "98.4%",
        imbalanceFixed: "1:200 ratio",
        latency: "45ms per frame"
      },
      tags: ["Vision Transformers (ViT)", "Diffusion Models", "PyTorch", "OpenCV", "Quality Inspection"],
      simType: "vit-defect"
    },
    {
      id: "fetal-health",
      title: "Multimodal Fetal Health Analysis with SHAP",
      category: "Healthcare AI & Explainable AI",
      subtitle: "Integrated Imaging & Clinical Record Risk Predictor",
      period: "2025",
      featured: true,
      description: "Integrated ultrasound imaging and structured clinical records into a multimodal deep learning pipeline. Implemented SHAP (SHapley Additive exPlanations) to provide clinicians with feature-level interpretability.",
      metrics: {
        aucRoc: "0.962",
        shapInterpretability: "Real-time clinical report",
        dataIngestion: "Multimodal fusion"
      },
      tags: ["Explainable AI (SHAP)", "PyTorch", "CNN", "Clinical Multimodal", "Pandas"],
      simType: "shap-fetal"
    },
    {
      id: "spinel-stability",
      title: "Physics-Aware Transformer for Material Stability",
      category: "Scientific Machine Learning",
      subtitle: "Predicting Spinel Crystal Stability from Sensor & Structural Data",
      period: "2025",
      featured: true,
      description: "Developed a transformer-based framework incorporating physical domain constraints and structured data tokenization to model crystal stability from high-dimensional sensor data.",
      metrics: {
        mae: "0.014 eV/atom",
        speedup: "120x vs DFT",
        dataPoints: "50,000+ compounds"
      },
      tags: ["Transformers", "Physics-Aware ML", "PyTorch", "NumPy", "Materials Science"],
      simType: "spinel-transformer"
    }
  ],

  skillCategories: [
    {
      category: "Machine Learning & Deep Learning",
      icon: "Brain",
      skills: [
        { name: "Scikit-learn / SVM", level: 95 },
        { name: "PyTorch", level: 92 },
        { name: "Vision Transformers (ViT)", level: 88 },
        { name: "CNNs & OpenCV", level: 90 },
        { name: "LSTMs & Time Series", level: 85 },
        { name: "Hyperparameter Tuning", level: 92 }
      ]
    },
    {
      category: "Generative AI & LLMs",
      icon: "Sparkles",
      skills: [
        { name: "Diffusion Models", level: 88 },
        { name: "GANs & VAEs", level: 86 },
        { name: "LLM Fine-Tuning & RAG", level: 85 },
        { name: "Synthetic Augmentation", level: 94 }
      ]
    },
    {
      category: "Explainable AI & Computer Vision",
      icon: "Eye",
      skills: [
        { name: "SHAP Interpretability", level: 92 },
        { name: "OpenCV Image Pipelines", level: 90 },
        { name: "Feature Engineering", level: 95 },
        { name: "Anomaly Detection", level: 92 }
      ]
    },
    {
      category: "Software & Data Engineering",
      icon: "Code2",
      skills: [
        { name: "Python", level: 96 },
        { name: "SQL & Data Pipelines", level: 90 },
        { name: "JavaScript / HTML / CSS", level: 88 },
        { name: "Django & REST APIs", level: 86 },
        { name: "Git & Agile Workflows", level: 92 }
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
      institution: "Anna University",
      cgpa: "8.00 / 10.0",
      year: "Graduated 2025",
      highlights: [
        "Specialized in Artificial Intelligence, Machine Learning, Data Structures & Algorithms, and Object-Oriented Design.",
        "Active member of Computer Science Technical Society."
      ]
    }
  ],

  certifications: [
    {
      title: "Machine Learning Intern Certification",
      issuer: "Cognifyz Technologies",
      date: "2024"
    },
    {
      title: "Full Stack Web Development Certification",
      issuer: "Networkz Systems",
      date: "2023"
    }
  ],

  // Siri / AI Resume Assistant knowledge items
  aiKnowledge: [
    {
      keywords: ["who", "about", "amaresh", "profile", "summary"],
      answer: "Amaresh D R is a Data Scientist and AI/ML Engineer with 1+ years of experience building and deploying multimodal ML, Generative AI (ViTs, Diffusion Models), Explainable AI (SHAP), and full-stack software solutions."
    },
    {
      keywords: ["skills", "tech", "python", "pytorch", "stack"],
      answer: "Amaresh specializes in Python, PyTorch, Scikit-learn, Vision Transformers (ViT), Diffusion Models, SHAP, OpenCV, SQL, Django, and JavaScript."
    },
    {
      keywords: ["experience", "work", "job", "lyceum", "history"],
      answer: "Amaresh currently works as a Research Analyst / Technical Programmer at Researcher Lyceum Private Limited (Jul 2025 – Present), where he builds multimodal ML models, automated data pipelines, and Generative AI defect detection systems."
    },
    {
      keywords: ["projects", "defect", "fetal", "transformer", "genai"],
      answer: "Key projects include: 1) GenAI Defect Detection using ViT & Diffusion Models, 2) Multimodal Fetal Health Analysis using SHAP, and 3) Physics-Aware Transformer for Spinel Material Stability."
    },
    {
      keywords: ["contact", "email", "phone", "location", "hire", "linkedin"],
      answer: "You can reach Amaresh at amareshapplies@gmail.com, +91 9486342674, or on LinkedIn at https://www.linkedin.com/in/amaresh-dr-551445433/. He is located in Bangalore, Karnataka, and is open to relocation worldwide."
    },
    {
      keywords: ["education", "degree", "cgpa", "college"],
      answer: "Amaresh holds a B.E. in Computer Science and Engineering from Anna University (Graduated 2025) with a CGPA of 8.00/10."
    },
    {
      keywords: ["resume", "cv", "download", "pdf"],
      answer: "You can download Amaresh's latest official resume (Amaresh_DR_Resume.pdf) using the 'Download Resume PDF' button in the About Amaresh window, through Quick Actions in the Control Center, or by typing 'resume' into the Terminal CLI."
    }
  ]
};
