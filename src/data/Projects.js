const Projects = [
    {
        title: "Turbo Blast",
        start: 2019,
        released: true,
        major: true,
        summary: `Massively multiplayer 3D racing game with procedurally generated tracks and dynamic rigid-body physics.
        Supports an arbitrary amount of players through connected controllers and keyboards.`,
        description: `Created with Java (libGDX) for desktop and Android. Modelling done with Blender. Physics handled with a wrapper to the Bullet physics engine.`,
        tools: [
            "libgdx",
        ],
        languages: [
            "Java",
            "C++"
        ],
        links: [
            {
                text: 'Download Windows/Linux/Mac and Android versions here!',
                link: 'https://github.com/beareye/racing-game/releases'
            }
        ],
        images: {
            banner: "turbo-blast-1.png",
            slideshow: [
                "turbo-blast-2.png"
            ]
        },
        soundcloud: "https://soundcloud.com/bchan061/turbo-boost-night"
    },
    {
        title: "Super Koala Climber",
        start: 2015,
        end: 2017,
        released: true,
        major: true,
        summary: `Fast-paced arcade game with multiplayer leaderboards and social media integration.
        Available on the App Store in both English and Spanish.`,
        description: `Created with Java (libGDX) for desktop, Android, and iOS (with the now-defunct RoboVM).
        Originally used the Facebook API to integrate friends and avatars into the user experience.
        Later repurposed to use Game Center for the iOS version.
        Music created with LMMS and mixed with Ableton Live.`,
        tools: [
            "libgdx",
            "facebook"
        ],
        languages: [
            "Java",
            "Objective-C"
        ],
        images: {
            banner: "superKoalaClimber.png",
            slideshow: [
                "superKoalaClimber-1.jpg",
                "superKoalaClimber-2.jpg"
            ]
        },
        soundcloud: "https://soundcloud.com/bchan061/game"
    },
    {
        title: "Librocite",
        start: 2015,
        released: true,
        major: true,
        summary: `App to create MLA citations for use with academic papers. Created for WUHack 2015.`,
        description: `Created with the Google Books API to fetch data from Google's databases.
        Created primarily with Java; fetches and interprets JSON data from the API.`,
        tools: [
            "google"
        ],
        languages: [
            "Java"
        ],
        images: {
            banner: "librocite.png",
            slideshow: [
                "librocite-1.jpg"
            ]
        }
    },
    {
        title: "Commando Joe: Episode 1",
        start: 2013,
        end: 2017,
        released: true,
        major: true,
        summary: `Stylish platformer with multiple weapons, various enemies and bosses, and dynamic environments.
        Includes leaderboards and in-app purchases to encourage competitive play. Self-published in the App Store.`,
        description: `Created with JavaScript (ImpactJS), originally for HTML5.
        Later ported to the App Store with Ejecta, and to Android devices with CocoonJS.
        In-app-purchases and Game Center leaderboards implemented via a native bridge to Objective-C.
        Music created with GarageBand; sound mixed with Audacity.
        Art created with Paint.NET and Inkscape. `,
        tools: [
            "impact",
            "inkscape",
            "audacity"
        ],
        languages: [
            "JavaScript",
            "Objective-C"
        ],
        images: {
            banner: "commandoJoe2.png",
            slideshow: [
                "commandoJoe2-1.jpg",
                "commandoJoe2-2.jpg"
            ]
        },
        links: [
            {
                text: 'Play a web version (from 2013) here!',
                link: './games/CommandoJoe2/index.html'
            }
        ],
        soundcloud: "https://soundcloud.com/bchan061/commando-joe-episode-1-infilitration"
    },
    {
        title: "Commando Joe: Prologue",
        start: 2012,
        end: 2017,
        released: true,
        major: true,
        summary: `Platformer with designed levels, dynamic environments, and various enemy types. Self-published in the App Store.`,
        description: `Created with JavaScript (ImpactJS), originally for HTML5.
        Later ported to the App Store with Ejecta, and to Android devices with CocoonJS.
        Music created with TuxGuitar; art created with Paint.NET and Inkscape. `,
        tools: [
            "impact",
            "inkscape",
            "audacity"
        ],
        languages: [
            "JavaScript",
            "Objective-C"
        ],
        images: {
            banner: "commandoJoe.png",
            slideshow: [
                "commandoJoe-1.jpg",
                "commandoJoe-2.jpg",
                "commandoJoe-3.jpg"
            ]
        },
        links: [
            {
                text: 'Play a web version (from 2012) here!',
                link: './games/CommandoJoe/index.html'
            }
        ]
    },
    {
        title: "Shootup Survival",
        start: 2012,
        end: 2017,
        released: true,
        major: true,
        summary: `Endless shoot-em-up with touch controls, alternating enemy types, and powerups. Self-published in the App Store.`,
        description: `Prototyped with C# (XNA); final app created with Objective-C (Cocos2D).
        Music composed with GarageBand; art created in Paint.NET and Pinta. `,
        tools: [
            "xna",
            "inkscape",
            "audacity",
            "cocos2d"
        ],
        languages: [
            "C#",
            "Objective-C"
        ],
        images: {
            banner: "shootupSurvival.png",
            slideshow: [
                "shootupSurvival-1.jpg",
                "shootupSurvival-2.jpg"
            ]
        }
    },
    {
        title: "Bogtris",
        start: 2018,
        major: true,
        summary: `Tetris clone that follows the current (2006) Tetris guideline, including support for Super Rotational System (SRS) twists.
        Extra features include multiplayer modes, back-to-back bonuses, and combos.
        Battle AI implemented with genetic algorithms. `,
        description: `Written with Pixi.JS and Javascript (ES6). Backend written with Node.js and Express.js. `,
        tools: [
            "pixijs",
            "nodejs"
        ],
        languages: [
            "JavaScript",
            "HTML5",
            "CSS3"
        ],
        images: {
            banner: "bogtris-1.png",
            slideshow: [
                "bogtris-2.png"
            ]
        },
        links: [
            {
                text: 'Play the single-player endless version here.',
                link: 'http://ocf.io/branchan/bogtris'
            },
            {
                text: 'Play the multiplayer version here. (Open the console to see evolution take place.)',
                link: 'http://ocf.io/branchan/bogtris-ai/bogtris/public/index.html'
            }
        ]
    },
    {
        title: "Flashcards",
        start: 2018,
        major: true,
        summary: `Personal project to learn React and analyze JSON files. Single page application with support for external JSON files.`,
        description: `Originally prototyped with Python. Later created with React and Node.js. `,
        tools: [
            "react",
            "nodejs"
        ],
        languages: [
            "JavaScript",
            "HTML5",
            "CSS3"
        ],
        images: {
            banner: "flashcards-1.png",
            slideshow: [
                "flashcards-2.png"
            ]
        }
    },
    {
        title: "Amiibo® Selector",
        start: 2018,
        summary: `Personal project to experiment with HTTP servers and frontend web development.
        Single page application with support for custom names. `,
        description: `Coded with Java (Spark), JavaScript, and HTML5 (Bootstrap + jQuery).
        Backend serves HTML pages, images, and JSON data for the frontend. `,
        tools: [
            "spark",
            "bootstrap",
            "jquery"
        ],
        languages: [
            "Java",
            "JavaScript",
            "HTML5",
            "CSS3"
        ],
        images: {
            banner: "amiibos.png"
        }
    },
    {
        title: "Animated Film Scorer",
        start: 2018,
        major: true,
        summary: `Project conducted with friends to see what is the best western animated film.
        Includes a visualizer to see film scores and a graph connecting all films and their scores to RottenTomatoes scores. `,
        description: `Coded with Python (NumPy, pyglet, scipy).
        Uses data from multiple (20) Google forms that were created with Google Apps Script. `,
        tools: [
            "google"
        ],
        languages: [
            "Python",
            "Google Apps Script"
        ],
        images: {
            banner: "bracket-1.png",
            slideshow: [
                "bracket-2.png",
                "bracket-3.png",
                "bracket-4.png"
            ]
        }
    },
    {
        title: "tabr",
        start: 2018,
        major: true,
        summary: `Guitar tab editor and viewer. Supports tabs created in JSON, which can be created and stored in a local database.`,
        description: `Front-end created with HTML5/CSS3, React, and Howler.js.
        Back-end created with Express.js and SQLite3.`,
        tools: [
            "react",
            "nodejs"
        ],
        languages: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "SQL"
        ],
        images: {
            banner: "tabr-1.png",
            slideshow: [
                "tabr-2.png"
            ]
        }
    }
]

export default Projects
