document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const resultSection = document.getElementById('result-section');
    
    // Zodiac sign data
    const zodiacSigns = [
        {
            name: "Aries",
            symbol: "Ram",
            element: "Fire",
            dates: "March 21 - April 19",
            image: "images/aries.svg",
            description: "Aries is the first sign of the zodiac. Those born under this sign are passionate, motivated, and confident leaders who build community with their cheerful disposition and relentless determination."
        },
        {
            name: "Taurus",
            symbol: "Bull",
            element: "Earth",
            dates: "April 20 - May 20",
            image: "images/taurus.svg",
            description: "Taurus is an earth sign represented by the bull. Like their celestial spirit animal, Taureans enjoy relaxing in serene, bucolic environments surrounded by soft sounds, soothing aromas, and succulent flavors."
        },
        {
            name: "Gemini",
            symbol: "Twins",
            element: "Air",
            dates: "May 21 - June 20",
            image: "images/gemini.svg",
            description: "Gemini is represented by the twins, and these air signs were interested in so many pursuits that they had to double themselves. They're sociable, communicative, and ready for fun."
        },
        {
            name: "Cancer",
            symbol: "Crab",
            element: "Water",
            dates: "June 21 - July 22",
            image: "images/cancer.svg",
            description: "Cancer is a cardinal water sign. Represented by the crab, this oceanic crustacean seamlessly weaves between the sea and shore representing Cancer's ability to exist in both emotional and material realms."
        },
        {
            name: "Leo",
            symbol: "Lion",
            element: "Fire",
            dates: "July 23 - August 22",
            image: "images/leo.svg",
            description: "Roll out the red carpet because Leo has arrived. Leo is represented by the lion and these spirited fire signs are the kings and queens of the celestial jungle. They're delighted to embrace their royal status."
        },
        {
            name: "Virgo",
            symbol: "Virgin",
            element: "Earth",
            dates: "August 23 - September 22",
            image: "images/virgo.svg",
            description: "Virgo is an earth sign historically represented by the goddess of wheat and agriculture. This earth sign is practical, analytical, and has a deep sense of humanity."
        },
        {
            name: "Libra",
            symbol: "Scales",
            element: "Air",
            dates: "September 23 - October 22",
            image: "images/libra.svg",
            description: "Libra is an air sign represented by the scales, an association that reflects Libra's fixation on balance and harmony. These air signs are the aesthetes of the zodiac: ruled by Venus, they're informed by beauty and art."
        },
        {
            name: "Scorpio",
            symbol: "Scorpion",
            element: "Water",
            dates: "October 23 - November 21",
            image: "images/scorpio.svg",
            description: "Scorpio is one of the most misunderstood signs of the zodiac. Because of its incredible passion and power, Scorpio is often mistaken for a fire sign. In fact, Scorpio is a water sign that derives its strength from the psychic, emotional realm."
        },
        {
            name: "Sagittarius",
            symbol: "Archer",
            element: "Fire",
            dates: "November 22 - December 21",
            image: "images/sagittarius.svg",
            description: "Represented by the archer, Sagittarians are always on a quest for knowledge. The last fire sign of the zodiac, Sagittarius launches its many pursuits like blazing arrows, chasing after geographical, intellectual, and spiritual adventures."
        },
        {
            name: "Capricorn",
            symbol: "Goat",
            element: "Earth",
            dates: "December 22 - January 19",
            image: "images/capricorn.svg",
            description: "The last earth sign of the zodiac, Capricorn is represented by the sea goat, a mythological creature with the body of a goat and the tail of a fish. Accordingly, Capricorns are skilled at navigating both the material and emotional realms."
        },
        {
            name: "Aquarius",
            symbol: "Water Bearer",
            element: "Air",
            dates: "January 20 - February 18",
            image: "images/aquarius.svg",
            description: "Despite the 'aqua' in its name, Aquarius is actually the last air sign of the zodiac. Innovative, progressive, and shamelessly revolutionary, Aquarius is represented by the water bearer, the mystical healer who bestows water, or life, upon the land."
        },
        {
            name: "Pisces",
            symbol: "Fish",
            element: "Water",
            dates: "February 19 - March 20",
            image: "images/pisces.svg",
            description: "Pisces, a water sign, is the last constellation of the zodiac. It's symbolized by two fish swimming in opposite directions, representing the constant division of Pisces's attention between fantasy and reality."
        }
    ];
    
    // Function to determine zodiac sign based on birthdate
    function getZodiacSign(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            return zodiacSigns[0]; // Aries
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            return zodiacSigns[1]; // Taurus
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            return zodiacSigns[2]; // Gemini
        } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            return zodiacSigns[3]; // Cancer
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            return zodiacSigns[4]; // Leo
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            return zodiacSigns[5]; // Virgo
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            return zodiacSigns[6]; // Libra
        } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            return zodiacSigns[7]; // Scorpio
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            return zodiacSigns[8]; // Sagittarius
        } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            return zodiacSigns[9]; // Capricorn
        } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            return zodiacSigns[10]; // Aquarius
        } else {
            return zodiacSigns[11]; // Pisces
        }
    }
    
    // Function to calculate age
    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
    
    // Event listener for submit button
    submitBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        
        if (!name || !birthdate) {
            alert('Please enter your name and birthdate');
            return;
        }
        
        const birthdateObj = new Date(birthdate);
        const zodiacSign = getZodiacSign(birthdateObj);
        const age = calculateAge(birthdate);
        
        // Display result
        displayResult(name, age, zodiacSign);
    });
    
    // Function to display result
    function displayResult(name, age, zodiacSign) {
        resultSection.innerHTML = `
            <h2 class="animate__animated animate__fadeIn">Your Zodiac Information</h2>
            <div class="user-info animate__animated animate__fadeIn">
                <p>Hello, <strong>${name}</strong>! You are <strong>${age}</strong> years old.</p>
            </div>
            <div class="zodiac-card animate__animated animate__zoomIn">
                <img src="${zodiacSign.image}" alt="${zodiacSign.name}" class="zodiac-image">
                <h3 class="zodiac-name">${zodiacSign.name}</h3>
                <p class="zodiac-date">${zodiacSign.dates}</p>
                <p><strong>Symbol:</strong> ${zodiacSign.symbol} | <strong>Element:</strong> ${zodiacSign.element}</p>
                <p class="zodiac-description">${zodiacSign.description}</p>
            </div>
        `;
        
        resultSection.classList.add('active');
        
        // Scroll to result section
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
});