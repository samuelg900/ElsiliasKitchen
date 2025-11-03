
const DEBUG = {
  YES: 2,
  NO: 1,
};

//Change DEBUG here mode when needed
const DEBUG_MODE = DEBUG.NO;

function setUpOnlyFor404Debug(){
     if(DEBUG_MODE === DEBUG.NO) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://samuelg900.github.io/ElsiliasKitchen/404.css';
        document.head.appendChild(link);
        console.log("Debug Mode is OFF");
    } else {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '404.css';
        document.head.appendChild(link);
        console.log("Debug Mode is ON");
    }
}