const Courses = [
    {
        title: "Structure and Interpretation of Computer Programs",
        number: "CS61A",
        term: "Fall 2017",
        link: "http://inst.eecs.berkeley.edu/~cs61a/fa17/",
        languages: ["Python", "Scheme", "SQL"],
        projects: [
            {
                title: "Scheme Interpreter",
                description: "Implemented code for a working implementation of the Scheme language.",
                link: "http://inst.eecs.berkeley.edu/~cs61a/fa17/proj/scheme/"
            }
        ]
    },
    {
        title: "Designing Information Devices and Systems I",
        number: "EE16A",
        term: "Fall 2017",
        link: "https://inst.eecs.berkeley.edu/~ee16a/fa17/",
        languages: ["Python"],
        frameworks: ["NumPy"]
    },
    {
        title: "Data Structures",
        number: "CS61B",
        term: "Spring 2018",
        link: "https://sp18.datastructur.es/",
        languages: ["Java"],
        projects: [
            {
                title: "Build Your Own World (BYOW)",
                description: "2D tile-based game, with entities, colored lighting, and saving/loading.",
                link: "https://sp18.datastructur.es/materials/proj/proj2/proj2"
            },
            {
                title: "BearMaps",
                description: "Google Maps clone with support for search and routing.",
                link: "https://sp18.datastructur.es/materials/proj/proj3/proj3"
            }
        ]
    },
    {
        title: "Designing Information Devices and Systems II",
        number: "EE16B",
        term: "Spring 2018",
        link: "https://inst.eecs.berkeley.edu/~ee16b/sp18/",
        languages: ["Python"],
        frameworks: ["NumPy"],
        projects: [
            {
                title: "Voice-Activated Car",
                description: "Arduino-powered car that moves via voice recognition. Built from simple circuitry and regression analysis."
            }
        ]
    },
    {
        title: "Machine Structures",
        number: "CS61C",
        term: "Fall 2018",
        link: "http://inst.eecs.berkeley.edu/~cs61c/fa18/",
        languages: ["C", "RISC-V", "Python"],
        frameworks: ["Apache Spark"],
        projects: [
            {
                title: "RISC-V CPU",
                description: "Design a pipelined RISC-V CPU in Logisim with a custom-built register file and arithmetic logic unit."
            }
        ]
    },
    {
        title: "Discrete Mathematics and Probability Theory",
        number: "CS70",
        term: "Fall 2018"
    },
    {
        title: "Computer Security",
        number: "CS161",
        term: "Spring 2019",
        link: "https://inst.eecs.berkeley.edu/~cs161/sp19/",
        languages: ["C", "Perl", "Go", "JavaScript", "SQL"],
        projects: [
            {
                title: "Secure Filesystem",
                description: "Design a filesystem in Go that uses encryption and cryptography to store files and user credentials in untrusted databases."
            }
        ]
    },
    {
        title: "Efficient Algorithms and Intractable Problems",
        number: "CS170",
        term: "Spring 2019",
        link: "https://inst.eecs.berkeley.edu/~cs170/sp19/",
        languages: ["Python"],
        projects: [
            {
                title: "Guavabot",
                description: "Design an algorithm to solve a computationally-hard real-life problem; competed with other classmates' algorithms based on efficiency.",
                link: "https://guavabot.cs170.org/"
            }
        ]
    },
    {
        title: "Computer Graphics and Imaging",
        number: "CS184",
        term: "Spring 2019",
        link: "https://cs184.eecs.berkeley.edu/sp19",
        languages: ["C++", "GLSL"],
        frameworks: ["OpenGL"],
        projects: [
            {
                title: "Rasterizer",
                description: "Software rasterizer to render various 2D texture-mapped geometry and SVG files.",
                link: "https://bchan061.github.io/cs184-p1-rasterizer/",
                image: "https://bchan061.github.io/cs184-p1-rasterizer/images/p_6_4.png",
                writeup: true
            },
            {
                title: "MeshEdit",
                description: "Mesh editor and renderer for meshes defined with half-edges. Also computes Bezier curves and Loop subdivision.",
                link: "https://bchan061.github.io/cs184-p2-meshedit/",
                image: "https://bchan061.github.io/cs184-p2-meshedit/images/p_6_2.png",
                writeup: true
            },
            {
                title: "Pathtracer",
                description: "Extensive optimized path-tracer to raycast different models and environments of different lighting, materials, and cameras (including differing lens and focus).",
                link: "./other/pathtracer.html",
                image: "https://bchan061.github.io/cs184-p3-2-pathtracer/images/p_4_dragon_23_005.png",
                writeup: true
            },
            {
                title: "Cloth Simulator",
                description: "Cloth simulator to render and edit cloths of varying materials and properties. Includes various GLSL shaders and physically accurate kinematics and lighting.",
                link: "https://bchan061.github.io/cs184-p4-clothsim/",
                image: "https://bchan061.github.io/cs184-p4-clothsim/images/p_5_mirror.png",
                writeup: true
            }
        ]
    },
    {
        title: "Introduction to Artificial Intelligence",
        number: "CS188",
        term: "Spring 2019",
        link: "https://inst.eecs.berkeley.edu/~cs188/sp19/",
        languages: ["Python"],
        projects: [
            {
                title: "Pac-Man Projects",
                description: "Implemented code that reflected course content (e.g. search algorithms, zero-sum games, reinforcement learning, probabilistic inference, machine learning).",
                link: "https://inst.eecs.berkeley.edu/~cs188/sp19/projects.html"
            }
        ]
    },
    {
        title: "Principles and Techniques of Data Science",
        number: "DS100",
        term: "Fall 2019",
        link: "http://www.ds100.org/fa19/"
    },
    {
        title: "Introduction to Database Systems",
        number: "CS186",
        term: "Fall 2019",
        link: "https://cs186berkeley.net/"
    },
    {
        title: "Introduction to Machine Learning",
        number: "CS189",
        term: "Fall 2019",
        link: "https://www.eecs189.org/"
    }
]

export default Courses
