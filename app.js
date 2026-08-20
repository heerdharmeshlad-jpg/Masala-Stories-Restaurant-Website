/* ==================================================
   MASALA STORIES
   INTERACTIVE RESTAURANT SYSTEM
================================================== */


/* ==================================================
   RESTAURANT DATA
================================================== */

const restaurant = {

    name: "Masala Stories",

    phone: "+919876543210",

    whatsapp: "919876543210",

    email: "hello@masalastories.in",

    menu: [

        {
            id: 1,
            name: "Truffle Kulcha",
            description: "Cheese · Truffle · Herbs",
            price: 420,
            category: "starter",
            image:
                "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 2,
            name: "Paneer Tikka",
            description: "Charred paneer · Smoked spices",
            price: 390,
            category: "starter",
            image:
                "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 3,
            name: "Butter Chicken",
            description: "Tomato · Butter · Smoked chicken",
            price: 590,
            category: "main",
            image:
                "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 4,
            name: "Masala Prawns",
            description: "Coastal spices · Lemon · Prawns",
            price: 680,
            category: "main",
            image:
                "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 5,
            name: "Dal Makhani",
            description: "Slow cooked · Butter · Cream",
            price: 360,
            category: "main",
            image:
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 6,
            name: "Chocolate Mishti",
            description: "Cocoa · Milk · Caramel",
            price: 350,
            category: "dessert",
            image:
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 7,
            name: "Gulab Jamun",
            description: "Warm dumplings · Rose · Vanilla",
            price: 240,
            category: "dessert",
            image:
                "https://images.unsplash.com/photo-1601303516534-0d5c3e9c1c5c?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 8,
            name: "Masala Chai",
            description: "Tea · Cardamom · Ginger",
            price: 140,
            category: "drink",
            image:
                "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=85"
        },

        {
            id: 9,
            name: "Mango Cooler",
            description: "Mango · Lime · Mint",
            price: 220,
            category: "drink",
            image:
                "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=85"
        }

    ]

};


/* ==================================================
   STATE
================================================== */

let currentSection = 0;

let currentCategory = "all";

let cart = [];

let isSectionAnimating = false;

let wheelLocked = false;

let touchStartX = 0;

let touchStartY = 0;


/* ==================================================
   DOM
================================================== */

const pages =
    document.querySelectorAll(".page");

const navButtons =
    document.querySelectorAll(".nav-button");

const glowOne =
    document.querySelector(".glow-one");

const glowTwo =
    document.querySelector(".glow-two");

const cursorGlow =
    document.querySelector(".cursor-glow");

const foodGrid =
    document.getElementById("foodGrid");

const noResults =
    document.getElementById("noResults");

const menuSearch =
    document.getElementById("menuSearch");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.querySelector(".cart-count");

const reservationModal =
    document.getElementById("reservationModal");

const reservationForm =
    document.getElementById("reservationForm");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const mobileNav =
    document.getElementById("mobileNav");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");


/* ==================================================
   SECTION COLORS
================================================== */

const sectionColors = [

    {
        one: "rgba(130,50,255,.30)",
        two: "rgba(255,90,70,.14)"
    },

    {
        one: "rgba(30,150,255,.24)",
        two: "rgba(130,50,255,.15)"
    },

    {
        one: "rgba(255,120,40,.28)",
        two: "rgba(255,40,120,.13)"
    },

    {
        one: "rgba(255,50,150,.25)",
        two: "rgba(80,100,255,.16)"
    },

    {
        one: "rgba(50,255,180,.20)",
        two: "rgba(40,100,255,.16)"
    }

];


/* ==================================================
   NAVIGATION
================================================== */

function goToSection(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }

    if (
        index === currentSection ||
        isSectionAnimating
    ) {
        return;
    }

    isSectionAnimating = true;

    pages[currentSection]
        .classList
        .remove("active");

    pages[index]
        .classList
        .add("active");


    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    const activeButton =
        document.querySelector(
            `.nav-button[data-index="${index}"]`
        );

    if (activeButton) {
        activeButton.classList.add("active");
    }


    glowOne.style.background =
        sectionColors[index].one;

    glowTwo.style.background =
        sectionColors[index].two;


    currentSection = index;


    setTimeout(() => {

        isSectionAnimating = false;

    }, 750);

}


/* ==================================================
   NAV BUTTONS
================================================== */

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.index);

        goToSection(index);

    });

});


/* ==================================================
   KEYBOARD NAVIGATION
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
        ) {

            event.preventDefault();

            goToSection(
                currentSection + 1
            );

        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {

            event.preventDefault();

            goToSection(
                currentSection - 1
            );

        }


        if (event.key === "Escape") {

            closeCart();

            closeReservation();

            closeLightbox();

            closeMobileNav();

        }

    }
);


/* ==================================================
   MOUSE WHEEL
================================================== */

window.addEventListener(
    "wheel",
    event => {

        if (window.innerWidth <= 768) {
            return;
        }

        if (wheelLocked) {
            return;
        }

        wheelLocked = true;


        if (event.deltaY > 0) {

            goToSection(
                currentSection + 1
            );

        } else {

            goToSection(
                currentSection - 1
            );

        }


        setTimeout(() => {

            wheelLocked = false;

        }, 850);

    },
    {
        passive: true
    }
);


/* ==================================================
   TOUCH SWIPE
================================================== */

window.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.touches[0].clientX;

        touchStartY =
            event.touches[0].clientY;

    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    event => {

        const endX =
            event.changedTouches[0].clientX;

        const endY =
            event.changedTouches[0].clientY;

        const differenceX =
            touchStartX - endX;

        const differenceY =
            touchStartY - endY;


        if (
            Math.abs(differenceX) <
            Math.abs(differenceY)
        ) {
            return;
        }


        if (
            Math.abs(differenceX) < 60
        ) {
            return;
        }


        if (differenceX > 0) {

            goToSection(
                currentSection + 1
            );

        } else {

            goToSection(
                currentSection - 1
            );

        }

    },
    {
        passive: true
    }
);


/* ==================================================
   CURSOR EFFECT
================================================== */

let mouseX = 0;

let mouseY = 0;

let glowX = 0;

let glowY = 0;


document.addEventListener(
    "mousemove",
    event => {

        if (window.innerWidth <= 768) {
            return;
        }

        mouseX = event.clientX;

        mouseY = event.clientY;

    }
);


function animateCursor() {

    glowX +=
        (mouseX - glowX) * .08;

    glowY +=
        (mouseY - glowY) * .08;


    if (cursorGlow) {

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

    }


    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();


/* ==================================================
   BACKGROUND PARALLAX
================================================== */

document.addEventListener(
    "mousemove",
    event => {

        if (window.innerWidth <= 768) {
            return;
        }

        const x =
            event.clientX /
            window.innerWidth -
            .5;

        const y =
            event.clientY /
            window.innerHeight -
            .5;


        glowOne.style.transform =
            `
            translate(
                ${x * 80}px,
                ${y * 80}px
            )
            `;


        glowTwo.style.transform =
            `
            translate(
                ${x * -60}px,
                ${y * -60}px
            )
            `;

    }
);


/* ==================================================
   MENU RENDER
================================================== */

function renderMenu() {

    const search =
        menuSearch.value
            .trim()
            .toLowerCase();


    const filtered =
        restaurant.menu.filter(item => {

            const categoryMatch =
                currentCategory === "all" ||
                item.category === currentCategory;


            const searchMatch =
                item.name
                    .toLowerCase()
                    .includes(search) ||

                item.description
                    .toLowerCase()
                    .includes(search);


            return (
                categoryMatch &&
                searchMatch
            );

        });


    foodGrid.innerHTML = "";


    if (filtered.length === 0) {

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    filtered.forEach(item => {

        const article =
            document.createElement("article");

        article.className =
            "food-item";


        article.innerHTML = `

            <div class="food-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >

            </div>

            <div class="food-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.description}
                </p>

            </div>

            <div>

                <div class="food-price">
                    ₹${item.price}
                </div>

                <button
                    class="add-food"
                    onclick="addToCart(${item.id})"
                    aria-label="Add ${item.name}"
                >
                    +
                </button>

            </div>

        `;


        foodGrid.appendChild(article);

    });

}


/* ==================================================
   MENU CATEGORY
================================================== */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn => {
                        btn.classList.remove("active");
                    });


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                renderMenu();

            }
        );

    });


/* ==================================================
   MENU SEARCH
================================================== */

menuSearch.addEventListener(
    "input",
    renderMenu
);


/* ==================================================
   ADD TO CART
================================================== */

function addToCart(id) {

    const item =
        restaurant.menu.find(
            product => product.id === id
        );


    if (!item) {
        return;
    }


    const existing =
        cart.find(
            product => product.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...item,
            quantity: 1
        });

    }


    updateCart();

    showToast(
        `${item.name} added to your order`
    );

}


/* ==================================================
   UPDATE CART
================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>✦</span>

                <p>
                    Your order is empty.
                </p>

                <button
                    onclick="
                        closeCart();
                        goToSection(2);
                    "
                >
                    EXPLORE MENU
                </button>

            </div>

        `;

        cartTotal.textContent =
            "₹0";

        cartCount.textContent =
            "0";

        return;

    }


    let total = 0;

    let quantityTotal = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

        quantityTotal +=
            item.quantity;


        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                class="cart-item-image"
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ₹${item.price}
                </div>

                <div class="quantity">

                    <button
                        onclick="
                            changeQuantity(
                                ${item.id},
                                -1
                            )
                        "
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="
                            changeQuantity(
                                ${item.id},
                                1
                            )
                        "
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="
                    removeFromCart(${item.id})
                "
                aria-label="Remove item"
            >
                ×
            </button>

        `;


        cartItems.appendChild(div);

    });


    cartTotal.textContent =
        `₹${total}`;

    cartCount.textContent =
        quantityTotal;

}


/* ==================================================
   CHANGE QUANTITY
================================================== */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    updateCart();

}


/* ==================================================
   REMOVE FROM CART
================================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    updateCart();

    showToast(
        "Item removed from your order"
    );

}


/* ==================================================
   OPEN CART
================================================== */

function openCart() {

    cartDrawer.classList.add("open");

    cartOverlay.classList.add("visible");

    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   CLOSE CART
================================================== */

function closeCart() {

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("visible");

    document.body.style.overflow =
        "hidden";

}


cartOverlay.addEventListener(
    "click",
    closeCart
);


/* ==================================================
   CHECKOUT
================================================== */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Add something to your order first"
                );

                return;

            }


            const orderText =
                cart.map(item =>
                    `${item.name} x${item.quantity}`
                ).join("\n");


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            const message =
                `Hello Masala Stories!%0A%0AI'd like to order:%0A${encodeURIComponent(orderText)}%0A%0ATotal: ₹${total}`;


            window.open(
                `https://wa.me/${restaurant.whatsapp}?text=${message}`,
                "_blank"
            );

        }
    );


/* ==================================================
   RESERVATION
================================================== */

function openReservation() {

    reservationModal.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function closeReservation() {

    reservationModal.classList.remove("open");

    document.body.style.overflow =
        "hidden";

}


reservationModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            reservationModal
        ) {

            closeReservation();

        }

    }
);


/* ==================================================
   MINIMUM DATE
================================================== */

const dateInput =
    document.getElementById(
        "reservationDate"
    );


const today =
    new Date();


const year =
    today.getFullYear();

const month =
    String(
        today.getMonth() + 1
    ).padStart(2, "0");

const day =
    String(
        today.getDate()
    ).padStart(2, "0");


dateInput.min =
    `${year}-${month}-${day}`;


/* ==================================================
   RESERVATION FORM
================================================== */

reservationForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("guestName")
                .value
                .trim();


        const guests =
            document
                .getElementById("guestCount")
                .value;


        const date =
            document
                .getElementById("reservationDate")
                .value;


        const time =
            document
                .getElementById("reservationTime")
                .value;


        if (
            !name ||
            !guests ||
            !date ||
            !time
        ) {

            showToast(
                "Please complete all required fields"
            );

            return;

        }


        const formattedDate =
            new Date(
                `${date}T00:00:00`
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        const message =
            `Hello Masala Stories!%0A%0AI'd like to request a table reservation.%0A%0AName: ${encodeURIComponent(name)}%0AGuests: ${guests}%0ADate: ${encodeURIComponent(formattedDate)}%0ATime: ${time}`;


        closeReservation();


        showToast(
            "Opening WhatsApp to confirm your reservation..."
        );


        setTimeout(() => {

            window.open(
                `https://wa.me/${restaurant.whatsapp}?text=${message}`,
                "_blank"
            );

        }, 700);

    }
);


/* ==================================================
   GALLERY
================================================== */

document
    .querySelectorAll(".gallery-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                const title =
                    item.dataset.title;


                lightboxImage.src =
                    image;

                lightboxImage.alt =
                    title;

                lightboxTitle.textContent =
                    title.toUpperCase();


                lightbox.classList.add(
                    "open"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "hidden";

}


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeLightbox();

        }

    }
);


/* ==================================================
   MOBILE MENU
================================================== */

mobileMenuBtn.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle(
            "open"
        );

    }
);


function closeMobileNav() {

    mobileNav.classList.remove(
        "open"
    );

}


/* ==================================================
   TOAST
================================================== */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


/* ==================================================
   HERO PARALLAX
================================================== */

const heroImageWrap =
    document.querySelector(
        ".hero-image-wrap"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth <= 768 ||
            !heroImageWrap
        ) {
            return;
        }


        const x =
            event.clientX /
            window.innerWidth -
            .5;

        const y =
            event.clientY /
            window.innerHeight -
            .5;


        heroImageWrap.style.transform =
            `
            rotate(${x * 3}deg)
            translate(
                ${x * 8}px,
                ${y * 8}px
            )
            `;

    }
);


/* ==================================================
   RESIZE SAFETY
================================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768
        ) {

            closeMobileNav();

        }

    }
);


/* ==================================================
   INITIALIZATION
================================================== */

renderMenu();

updateCart();

pages.forEach(
    (page, index) => {

        page.classList.toggle(
            "active",
            index === 0
        );

    }
);

navButtons.forEach(
    (button, index) => {

        button.classList.toggle(
            "active",
            index === 0
        );

    }
);