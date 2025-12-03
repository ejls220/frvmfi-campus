(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Courses carousel
    $(".courses-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
    });


    // Related carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {

    const buildingData = {
        ground: { name: "Ground Area", img: "ground.jpg", desc: "The **Ground Area** is the central hub, used for school assemblies, large-scale events, and various student activities.", materialIcon: "event" },
        rotc: { name: "ROTC Building", img: "rotc.jpg", desc: "This building is dedicated to **ROTC military training** and related program offices.", materialIcon: "military_tech" },
        chapel: { name: "School Chapel", img: "School-chapel.jpg", desc: "A peaceful and serene space designated for **worship, prayer, and quiet reflection** for all members of the community.", materialIcon: "church" },
        blue: { name: "Blue Building", img: "blue-building.jpg", desc: "The **Blue Building** houses numerous general classrooms and departmental offices.", materialIcon: "school" },
        elementary: { name: "Elementary School", img: "elementary.jpg", desc: "The dedicated facility for our **youngest learners**, containing classrooms and play areas for the elementary grades.", materialIcon: "child_care" },
        stage: { name: "Main Stage", img: "stage.jpg", desc: "The **Stage** is the venue for major school performances, ceremonies, and presentations.", materialIcon: "theater_comedy" },
        main: { name: "Main Building", img: "main-building.jpg", desc: "The **Main Building** contains the administrative offices, faculty lounges, and several key classrooms.", materialIcon: "business" },
        pt: { name: "Physical Therapy", img: "pt.jpg", desc: "The **Physical Therapy (PT) Building** is equipped for hands-on therapeutic practice and related academic studies.", materialIcon: "health_and_safety" },
        canteen: { name: "School Canteen", img: "canteen.jpg", desc: "The main food service area, offering a variety of **meals, snacks, and refreshments** for students and staff.", materialIcon: "restaurant" },
        pmv: { name: "PMV Maintenance", img: "pmv.jpg", desc: "The **PMV Building** is used for the maintenance and storage of program vehicles and equipment.", materialIcon: "build" },
        basketball: { name: "Basketball Court", img: "basketball.jpg", desc: "The outdoor **Basketball Court** is available for sports, games, and recreation.", materialIcon: "sports_basketball" },
        science: { name: "Science Lab", img: "science-lab.jpg", desc: "The **Science Laboratory** is a specialized area for conducting experiments and practical science work.", materialIcon: "science" },
        hm: { name: "HM Hall", img: "hm-hall.jpg", desc: "The **HM Hall** is dedicated to hospitality management (HM) courses, including practical training kitchens and function rooms.", materialIcon: "room_service" },
        highschool: { name: "High School Dept.", img: "highschool.jpg", desc: "A collection of buildings that form the main **High School departmental** and classroom complex.", materialIcon: "book" },
        library: { name: "Main Library", img: "library.jpg", desc: "The **Library** provides extensive resources, quiet study spaces, and reading areas for all students.", materialIcon: "local_library" }
    };

    const elements = {
        dropdown: document.getElementById("buildingDropdown"),
        dropdownButtonText: document.getElementById("selectedBuildingName"),
        buildingImg: document.getElementById("buildingImg"),
        buildingDesc: document.getElementById("buildingDesc"),
        // NEW: Search Input element
        searchInput: document.getElementById("buildingSearchInput"), 
    };

    // --- 1. POPULATE UI ELEMENTS (Dropdown only) ---
    function populateUI() {
        Object.keys(buildingData).forEach(key => {
            const data = buildingData[key];

            // A. Create Dropdown Item
            const item = document.createElement("a");
            item.classList.add("dropdown-item");
            item.dataset.key = key;
            item.href = "#";
            
            // Icon element for visual cue
            const iconHTML = `<span class="material-icons mr-2" style="font-size: 1.2rem;">${data.materialIcon}</span>`;
            
            // Item structure: Icon + Name
            item.innerHTML = `${iconHTML} ${data.name}`;
            
            item.addEventListener("click", (e) => {
                e.preventDefault();
                updateBuilding(key);
            });
            // We append the item to the dropdown, after the search input (if it exists)
            elements.dropdown.appendChild(item);
        });
    }
    
    // --- NEW: FILTER FUNCTIONALITY ---
    function filterBuildings() {
        const filter = elements.searchInput.value.toUpperCase();
        const items = elements.dropdown.querySelectorAll(".dropdown-item");

        items.forEach(item => {
            const text = item.textContent || item.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                // Show the item
                item.style.display = ""; 
            } else {
                // Hide the item
                item.style.display = "none";
            }
        });
    }

    // --- 2. CORE FUNCTION: UPDATE UI STATE ---
    function updateBuilding(key) {
        const data = buildingData[key];

        // 1. Update Image (with a smooth transition)
        elements.buildingImg.style.opacity = '0.1'; 
        setTimeout(() => {
            elements.buildingImg.src = "img/" + data.img;
            elements.buildingImg.style.opacity = '1'; 
        }, 150); 

        // 2. Update Description Text
        elements.buildingDesc.innerHTML = data.desc;

        // 3. Update Dropdown Button Text
        elements.dropdownButtonText.innerHTML = `${data.name}`;

        // 4. Update Active States (Dropdown only)
        document.querySelectorAll(".dropdown-item").forEach(el => el.classList.remove("active"));
        document.querySelector(`.dropdown-item[data-key="${key}"]`).classList.add("active");
        
        // 5. Scroll to Image on mobile/small screens for visibility
        if (window.innerWidth < 992) {
            elements.buildingImg.scrollIntoView({ behavior: "smooth" });
        }
    }

    // --- 3. INITIALIZATION ---
    populateUI();
    // Load default: "ground"
    updateBuilding("ground"); 

    // NEW: Attach the filter function to the search input
    if (elements.searchInput) {
        elements.searchInput.addEventListener("keyup", filterBuildings);
    }
});


