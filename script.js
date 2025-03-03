document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const nameInput = document.getElementById('name');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const yearSelect = document.getElementById('year-select');
    const checkButton = document.getElementById('check-btn');
    const resultCard = document.getElementById('result-card');
    const zodiacIcon = document.getElementById('zodiac-icon');
    const zodiacName = document.getElementById('zodiac-name');
    const zodiacDate = document.getElementById('zodiac-date');
    const ageResult = document.getElementById('age-result');
    const zodiacTraits = document.getElementById('zodiac-traits');

    // Initialize the date picker
    initDatePicker();

    // Zodiac signs data
    const zodiacSigns = [
        {
            name: "Aries",
            startDate: { month: 3, day: 21 },
            endDate: { month: 4, day: 19 },
            icon: "fas fa-fire",
            traits: "Energetic, confident, impulsive, competitive"
        },
        {
            name: "Taurus",
            startDate: { month: 4, day: 20 },
            endDate: { month: 5, day: 20 },
            icon: "fas fa-seedling",
            traits: "Reliable, patient, practical, devoted"
        },
        {
            name: "Gemini",
            startDate: { month: 5, day: 21 },
            endDate: { month: 6, day: 20 },
            icon: "fas fa-user-friends",
            traits: "Adaptable, outgoing, curious, inconsistent"
        },
        {
            name: "Cancer",
            startDate: { month: 6, day: 21 },
            endDate: { month: 7, day: 22 },
            icon: "fas fa-water",
            traits: "Loyal, emotional, sympathetic, protective"
        },
        {
            name: "Leo",
            startDate: { month: 7, day: 23 },
            endDate: { month: 8, day: 22 },
            icon: "fas fa-crown",
            traits: "Creative, passionate, generous, dominant"
        },
        {
            name: "Virgo",
            startDate: { month: 8, day: 23 },
            endDate: { month: 9, day: 22 },
            icon: "fas fa-leaf",
            traits: "Analytical, kind, hardworking, critical"
        },
        {
            name: "Libra",
            startDate: { month: 9, day: 23 },
            endDate: { month: 10, day: 22 },
            icon: "fas fa-balance-scale",
            traits: "Diplomatic, gracious, fair-minded, social"
        },
        {
            name: "Scorpio",
            startDate: { month: 10, day: 23 },
            endDate: { month: 11, day: 21 },
            icon: "fas fa-dragon",
            traits: "Passionate, stubborn, resourceful, brave"
        },
        {
            name: "Sagittarius",
            startDate: { month: 11, day: 22 },
            endDate: { month: 12, day: 21 },
            icon: "fas fa-horse",
            traits: "Generous, idealistic, great sense of humor"
        },
        {
            name: "Capricorn",
            startDate: { month: 12, day: 22 },
            endDate: { month: 1, day: 19 },
            icon: "fas fa-mountain",
            traits: "Responsible, disciplined, self-control"
        },
        {
            name: "Aquarius",
            startDate: { month: 1, day: 20 },
            endDate: { month: 2, day: 18 },
            icon: "fas fa-tint",
            traits: "Progressive, original, independent, humanitarian"
        },
        {
            name: "Pisces",
            startDate: { month: 2, day: 19 },
            endDate: { month: 3, day: 20 },
            icon: "fas fa-fish",
            traits: "Compassionate, artistic, intuitive, gentle"
        }
    ];

    // Function to initialize the date picker
    function initDatePicker() {
        // Create a document fragment for better performance
        const yearFragment = document.createDocumentFragment();
        
        // Populate years (from current year down to 100 years ago)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= currentYear - 100; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFragment.appendChild(option);
        }
        yearSelect.appendChild(yearFragment);
        
        // Pre-populate days (1-31)
        const dayFragment = document.createDocumentFragment();
        for (let day = 1; day <= 31; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            dayFragment.appendChild(option);
        }
        daySelect.appendChild(dayFragment);
        
        // Add event listeners with debouncing
        let timeout;
        monthSelect.addEventListener('change', function() {
            clearTimeout(timeout);
            timeout = setTimeout(updateDays, 10);
        });
        
        yearSelect.addEventListener('change', function() {
            clearTimeout(timeout);
            timeout = setTimeout(updateDays, 10);
        });
        
        // Initial days update
        updateDays();
    }

    // Function to update days based on selected month and year
    function updateDays() {
        const month = parseInt(monthSelect.value) || 1;
        const year = parseInt(yearSelect.value) || new Date().getFullYear();
        
        // Get number of days in the selected month and year
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // Show/hide day options based on days in month
        const dayOptions = daySelect.options;
        
        // Skip the first option (placeholder)
        for (let i = 1; i < dayOptions.length; i++) {
            const day = parseInt(dayOptions[i].value);
            dayOptions[i].style.display = day <= daysInMonth ? '' : 'none';
        }
        
        // If the currently selected day is greater than days in month, reset selection
        if (parseInt(daySelect.value) > daysInMonth) {
            daySelect.selectedIndex = 0;
        }
    }

    // Add event listener to the button
    checkButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const month = monthSelect.value;
        const day = daySelect.value;
        const year = yearSelect.value;
        
        if (!name || !month || !day || !year) {
            alert("Please enter your name and complete birthdate");
            return;
        }
        
        // Create date object from selected values
        const birthdateObj = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
        
        // Get zodiac sign and age
        const zodiacSign = getZodiacSign(birthdateObj);
        const age = calculateAge(birthdateObj);
        
        // Update the result card
        updateResultCard(name, zodiacSign, age);
        
        // Show the result card with animation
        resultCard.classList.remove('hidden');
        resultCard.classList.add('visible');
    });

    // Function to get zodiac sign based on birthdate
    function getZodiacSign(birthdate) {
        const month = birthdate.getMonth() + 1; // JavaScript months are 0-indexed
        const day = birthdate.getDate();
        
        for (const sign of zodiacSigns) {
            // Handle zodiac signs that span across two years (e.g., Capricorn)
            if (sign.startDate.month === 12 && sign.endDate.month === 1) {
                if ((month === 12 && day >= sign.startDate.day) || 
                    (month === 1 && day <= sign.endDate.day)) {
                    return sign;
                }
            } else {
                if ((month === sign.startDate.month && day >= sign.startDate.day) || 
                    (month === sign.endDate.month && day <= sign.endDate.day)) {
                    return sign;
                }
            }
        }
        
        return null; // This should never happen if data is correct
    }

    // Function to calculate age
    function calculateAge(birthdate) {
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        
        // If birthday hasn't occurred yet this year, subtract 1 from age
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        
        return age;
    }

    // Function to update the result card
    function updateResultCard(name, zodiacSign, age) {
        // Format date range string
        const startMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(2000, zodiacSign.startDate.month - 1, 1));
        const endMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(2000, zodiacSign.endDate.month - 1, 1));
        
        const dateRangeStr = `${startMonth} ${zodiacSign.startDate.day} - ${endMonth} ${zodiacSign.endDate.day}`;
        
        // Update DOM elements
        zodiacIcon.innerHTML = `<i class="${zodiacSign.icon}"></i>`;
        zodiacName.textContent = zodiacSign.name;
        zodiacDate.textContent = dateRangeStr;
        ageResult.textContent = `${name}, your age is ${age} years`;
        zodiacTraits.textContent = `Traits: ${zodiacSign.traits}`;
    }
});