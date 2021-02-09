const html = document.querySelector("html");
const theme = document.querySelector("input[name=toggle]");

//Pegar os estilos atuais do CSS

const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style);

//Cores light theme

const lightTheme = {
    bg: getStyle(html, "--bg"),
}

//Cores do dark theme

const darkTheme = {
    bg: "#1C1C1C",
}

const convertKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeThemes = (themes) => {
    Object.keys(themes).map(key => html.style.setProperty(convertKey(key), themes[key]));

}

theme.addEventListener("change", ({target}) => {
    theme.checked ? changeThemes(darkTheme) : changeThemes(lightTheme);
});