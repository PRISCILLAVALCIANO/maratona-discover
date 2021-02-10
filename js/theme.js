const html = document.querySelector("html");
const theme = document.querySelector("input[name=toggle]");

//Pegar os estilos atuais do CSS

const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style);

//Cores light theme

const lightTheme = {
    bg: getStyle(html, "--bg"),
    bgHeader: getStyle(html, "--bg-header"),
    bgWhite: getStyle(html, "--bg-white"),
    textTable: getStyle(html, "--text-table"),
    cardTotal: getStyle(html, "--card-total"),
    darkBlue: getStyle(html, "--dark-blue"),
    bgModal: getStyle(html, "--bg-modal"),
}

//Cores do dark theme

const darkTheme = {
    bg: "#1C1C1C",
    bgHeader: "#020202",
    bgWhite: "#424242",
    textTable: "#f3f2f2",
    cardTotal: "#0f3519",
    darkBlue: "#f2f5f3",
    bgModal: "#1C1C1C",
}

const convertKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeThemes = (themes) => {
    Object.keys(themes).map(key => html.style.setProperty(convertKey(key), themes[key]));

}

theme.addEventListener("change", ({target}) => {
    theme.checked ? changeThemes(darkTheme) : changeThemes(lightTheme);
});