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
        ground: { name: "Ground Area", img: "/frvmfi/img/ground.jpg", desc: "The <strong>Ground Area</strong> is the central hub, used for school assemblies, large-scale events, and various student activities.", materialIcon: "event" },
        rotc: { name: "ROTC Building", img: "/frvmfi/img/rotc.jpg", desc: "This building is dedicated to <strong>ROTC military training</strong> and related program offices.", materialIcon: "military_tech" },
        chapel: { name: "School Chapel", img: "img/school-chapel.jpg", desc: "A peaceful and serene space designated for <strong>worship, prayer, and quiet reflection</strong> for all members of the community.", materialIcon: "church" },
        blue: { name: "Blue Building", img: "/frvmfi/img/blue-building.jpg", desc: "The <strong>Blue Building</strong> houses numerous general classrooms and departmental offices.", materialIcon: "school" },
        elementary: { name: "Elementary School", img: "/frvmfi/img/elementary.jpg", desc: "The dedicated facility for our <strong>youngest learners</strong>, containing classrooms and play areas for the elementary grades.", materialIcon: "child_care" },
        stage: { name: "Main Stage", img: "/frvmfi/img/stage.jpg", desc: "The <strong>Stage</strong> is the venue for major school performances, ceremonies, and presentations.", materialIcon: "theater_comedy" },
        main: { name: "Main Building", img: "/frvmfi/img/main-building.jpg", desc: "The <strong>Main Building</strong> contains the administrative offices, faculty lounges, and several key classrooms.", materialIcon: "business" },
        pt: { name: "Physical Therapy", img: "/frvmfi/img/pt.jpg", desc: "The <strong>Physical Therapy (PT) Building</strong> is equipped for hands-on therapeutic practice and related academic studies.", materialIcon: "health_and_safety" },
        canteen: { name: "School Canteen", img: "/frvmfi/img/canteen.jpg", desc: "The main food service area, offering a variety of <strong>meals, snacks, and refreshments</strong> for students and staff.", materialIcon: "restaurant" },
        pmv: { name: "PMV Maintenance", img: "/frvmfi/img/pmv.jpg", desc: "The <strong>PMV Building</strong> is used for the maintenance and storage of program vehicles and equipment.", materialIcon: "build" },
        basketball: { name: "Basketball Court", img: "/frvmfi/img/basketball.jpg", desc: "The outdoor <strong>Basketball Court</strong> is available for sports, games, and recreation.", materialIcon: "sports_basketball" },
        science: { name: "Science Lab", img: "/frvmfi/img/science-lab.jpg", desc: "The <strong>Science Laboratory</strong> is a specialized area for conducting experiments and practical science work.", materialIcon: "science" },
        hm: { name: "HM Hall", img: "/frvmfi/img/hm-hall.jpg", desc: "The <strong>HM Hall</strong> is dedicated to hospitality management (HM) courses, including practical training kitchens and function rooms.", materialIcon: "room_service" },
        highschool: { name: "High School Dept.", img: "/frvmfi/img/highschool.jpg", desc: "A collection of buildings that form the main <strong>High School departmental</strong> and classroom complex.", materialIcon: "book" },
        library: { name: "Main Library", img: "/frvmfi/img/library.jpg", desc: "The <strong>Library</strong> provides extensive resources, quiet study spaces, and reading areas for all students.", materialIcon: "local_library" }
    };

    const elements = {
        dropdown: document.getElementById("buildingDropdown"),
        dropdownButtonText: document.getElementById("selectedBuildingName"),
        buildingImg: document.getElementById("buildingImg"),
        buildingDesc: document.getElementById("buildingDesc"),
        searchInput: document.getElementById("buildingSearchInput"),
    };

    // Populate Dropdown
    function populateDropdown() {
        Object.keys(buildingData).forEach(key => {
            const data = buildingData[key];

            const item = document.createElement("a");
            item.classList.add("dropdown-item");
            item.dataset.key = key;
            item.href = "#";

            const iconHTML = `<span class="material-icons mr-2" style="font-size: 1.2rem;">${data.materialIcon}</span>`;
            item.innerHTML = `${iconHTML} ${data.name}`;

            item.addEventListener("click", (e) => {
                e.preventDefault();
                updateBuilding(key);
            });

            elements.dropdown.appendChild(item);
        });
    }

    // Filter dropdown items
    function filterBuildings() {
        const filter = elements.searchInput.value.toUpperCase();
        const items = elements.dropdown.querySelectorAll(".dropdown-item");

        items.forEach(item => {
            const text = item.textContent || item.innerText;
            item.style.display = text.toUpperCase().includes(filter) ? "" : "none";
        });
    }

    // Update building info
    function updateBuilding(key) {
        const data = buildingData[key];

        // Fade effect
        elements.buildingImg.style.opacity = '0.1'; 
        setTimeout(() => {
            elements.buildingImg.src = "img/" + data.img;
            elements.buildingImg.style.opacity = '1'; 
        }, 150);

        // Update description and dropdown button text
        elements.buildingDesc.innerHTML = data.desc;
        elements.dropdownButtonText.innerHTML = data.name;

        // Set active item
        document.querySelectorAll(".dropdown-item").forEach(el => el.classList.remove("active"));
        const activeItem = document.querySelector(`.dropdown-item[data-key="${key}"]`);
        if (activeItem) activeItem.classList.add("active");

        // Close dropdown on selection
        if (window.bootstrap) { // Bootstrap 5
            const dropdown = bootstrap.Dropdown.getInstance(document.getElementById('dropdownButton'));
            if (dropdown) dropdown.hide();
        }
    }

    // Initialize
    populateDropdown();
    updateBuilding("ground"); // Set initial building

    if (elements.searchInput) {
        elements.searchInput.addEventListener("keyup", filterBuildings);
    }
});
















