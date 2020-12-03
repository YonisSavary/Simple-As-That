// lastOpened purpose is to prevent multiples
// menu opened at the same time
let lastOpened = 0;

// ignoredMenu purpose is to close a menu
// if the mouse never entered it within some seconds 
// (the value of the delay is IGNORE_DELAY, in seconds)
let ignoredMenu = false;
const IGNORE_DELAY = 1.5;
// You can set IGNORE_APPLY to false to 
// disable the auto-close feature
const IGNORE_APPLY = true;



function openMenu(e){
    e.preventDefault();
    let link = $(e.target);
    let menu = $(link.next())
    let hitbox = e.target.getBoundingClientRect()

    if (!menu.hasClass("topbar-menu")) return ;
    // Redefine lastOpened if needed
    // (and close an already opened menu if we have one)
    if (lastOpened != menu){
        if (lastOpened !== 0 ) lastOpened.hide();
        lastOpened = menu
    }

    // Show to submenu to the right place
    menu.css({
        display:"flex",
        top: `${hitbox.top + hitbox.height + 5}px`,
        left: `${hitbox.left}px`,
        minWidth: `${hitbox.width}px`
    })

    // Ignore feature
    ignoredMenu = true;
    if (IGNORE_APPLY == true){
        setTimeout(checkIgnore, IGNORE_DELAY*1000);
    }
}

/**
 * Automaticaly called, close an opened menu
 * if : 
 *  - IGNORE_APPLY is True
 *  - <IGNORE_DELAY> seconds passed
 */
function checkIgnore(){
    if (ignoredMenu == false) return ;
    lastOpened.hide()
}

/**
 * Tell to the ignore feature that the 
 * submenu is not ignored ! so it won't
 * close until the mouseleave event is triggered
 */
function noticeIgnore(){
    ignoredMenu = false;
}

// The condition prevent an unexpected event,
// sometimes if you leave a topbar-menu element too fast
// the event target will be an element of the menu and 
// not the menu itself !
function closeMenu(e){
    if($(e.target).hasClass("topbar-menu")){
        $(e.target).hide()
    } else {
        $(e.target).parent().hide()
    }
}

// OPEN_MODE = 0 // Open on hover
// OPEN_MODE = 1 // Open on click
// Default value is 0

const OPEN_MODE = 0;

let openMethod = "mouseenter";
switch(OPEN_MODE){
    case 0: 
        openMethod = "mouseenter"
    break;
    case 1: 
        openMethod = "click"
    break;
}
$(".topbar-menu-title").on(openMethod, openMenu)
$(".topbar-menu").on("mouseleave", closeMenu)
$(".topbar-menu").on("mouseenter", noticeIgnore)