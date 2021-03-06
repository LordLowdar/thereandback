let toggleNavStatus = false;
let descriptionOpen = false;

let infoWindowOpen = false;
let getInfoWindows = document.querySelectorAll(" .infoWindow")
 let WindowsLength = getInfoWindows.length;

function toggleNav()
{
  let getNavBar = document.querySelector(".nav-hideaway");
  if(toggleNavStatus === false)
  {
    getNavBar.style.visibility  = "visible";
    getNavBar.style.width = "250px";
    getNavBar.style.opacity =  "1";  
    toggleNavStatus = true;
  }
  else if (toggleNavStatus === true)
  {    
    getNavBar.style.width = "1%";
    getNavBar.style.opacity =  "0";  
    toggleNavStatus = false;
    getNavBar.style.visibility = "none";
    closeInfo();
  }
}

function closeInfo()
{
  document.getElementById("contact-us-display").style.visibility = "collapse";
  document.getElementById("about-us-display").style.visibility = "collapse";
  document.getElementById("about-app-display").style.visibility = "collapse";
  document.getElementById("about-calendar-display").style.visibility = "collapse";

  infoWindowOpen = false;
}

/*A collection of functions meant to display various secific windows of  text*/
  function showContactUs()
 {  
    if (infoWindowOpen === true)
    {
      closeInfo() ;
    }
    document.getElementById("contact-us-display").style.visibility = "visible";
    infoWindowOpen = true;
  }

  function showAboutUs()
  {
    if (infoWindowOpen === true)
    {
      closeInfo() ;
    }
      document.getElementById("about-us-display").style.visibility = "visible";
      infoWindowOpen = true;  
  }

  function showAboutApp()
  {
    if (infoWindowOpen === true)
    {
      closeInfo() ;
    }
      document.getElementById("about-app-display").style.visibility = "visible";
      infoWindowOpen = true;
  }

  function showAboutTodo()
  {
    document.querySelector(".todo-title-box").style.width = "870px";
    document.querySelector("#about-todo-display").style.opacity ="1";
  }

  function hideAboutTodo()
  {
    document.querySelector(".todo-title-box").style.width = "200px";
    document.querySelector("#about-todo-display").style.opacity ="0";
  }

  function showAboutFeatures()
  {
    document.querySelector(".features-title-box").style.width = "870px";
    document.querySelector("#about-features-display").style.opacity ="1";
  }

  function hideAboutFeatures()
  {
    document.querySelector(".features-title-box").style.width = "200px";
    document.querySelector("#about-features-display").style.opacity ="0";
  }

  function showAboutCalendar()
  {
    if (infoWindowOpen === true)
    {
      closeInfo() ;
    }
      document.getElementById("about-calendar-display").style.visibility = "visible";
      infoWindowOpen = true;
  }




/**/
