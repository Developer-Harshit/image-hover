class Hover {
  constructor(imgContainer, tileWrapper, article) {
    this.container = imgContainer;
    this.wrapper = tileWrapper;
    this.article = article;
    this.toggled = false;
    this.columns = 0;
    this.rows = 0;
    this.id = Math.floor(Math.random() * 1000);
    this.tileId = `tile${this.id}`;
    this.containerId = `container${this.id}`;
  }
  init() {
    this.createGrid();
  }

  toggle() {
    this.toggled = !this.toggled;

    this.container.classList.toggle("toggled");
  }
  handleAnimation(index, state) {
    this.toggled = state;

    this.container.classList.toggle("toggled");

    const k = anime({
      targets: `.${this.tileId}`,
      opacity: this.toggled ? 0 : 1,
      delay: anime.stagger(60, {
        grid: [this.columns, this.rows],
        from: index,
      }),
    });
  }

  createTile(index) {
    const tile = document.createElement("div");

    tile.classList.add(this.tileId);
    tile.classList.add("tile");

    tile.style.opacity = this.toggled ? 0 : 1;

    tile.onmouseover = (e) => this.handleAnimation(index, true);
    tile.onmouseout = (e) => this.handleAnimation(index, false);

    return tile;
  }
  createTiles(quantity) {
    Array.from(Array(quantity)).map((tile, index) => {
      this.wrapper.appendChild(this.createTile(index));
    });
  }
  createGrid() {
    this.wrapper.innerHTML = "";

    const size = this.container.clientWidth > 800 ? 200 : 80;

    this.columns = Math.floor(this.container.clientWidth / size);
    this.rows = Math.floor(this.container.clientHeight / size);
    console.log(this.container.clientHeight, this.container.clientWidth);

    this.wrapper.style.setProperty("--columns", this.columns);
    this.wrapper.style.setProperty("--rows", this.rows);

    this.createTiles(this.columns * this.rows);
  }
  addStyle(article) {
    const styleElement = document.createElement("style");
    this.container.classList.add(this.containerId);

    const cssStyles = `
    .${this.containerId} {

      background-image: 
      
        linear-gradient(
          126deg,
          ${this.article.color},
          ${this.article.color}
        ),

       
        url(/img/${this.article.img});

    }
  .${this.containerId}:hover{
    box-shadow: 0px 0px 100px ${this.article.color};
    background-image: url(/img/${this.article.img});
  }
  .${this.containerId} .tile-wrapper {
    background-image: url(/img/${this.article.icon})
  }
    `;
    styleElement.type = "text/css";

    if (styleElement.styleSheet) styleElement.styleSheet.cssText = cssStyles;
    else styleElement.appendChild(document.createTextNode(cssStyles));

    document.querySelector("head").appendChild(styleElement);
  }
}
class Article {
  constructor(img, icon, text, color) {
    this.img = img;
    this.icon = icon;
    this.text = text;
    this.color = color;
  }
}
const hovers = [];
const imgSrcs = [
  "snowMountain.jpg",
  "oceanRock.jpg",
  "forestCave.jpg",
  "desertPlatue.jpg",
];

const iconSrcs = [
  "snowMount.icon.png",
  "ocean.icon.png",
  "forest.icon.png",
  "desert.icon.png",
];
const articles = [];
articles.push(
  new Article(
    "snowMountain.jpg",
    "snowMount.icon.png",
    "Mountain",
    "rgba(5, 71, 77, 0.741)"
  )
);
articles.push(
  new Article(
    "oceanRock.jpg",
    "ocean.icon.png",
    "Ocean",
    "rgba(6, 15, 66, 0.809) "
  )
);
articles.push(
  new Article(
    "forestCave.jpg",
    "forest.icon.png",
    "Forest",
    " rgba(6, 73, 50, 0.801)"
  )
);
articles.push(
  new Article(
    "desertPlatue.jpg",
    "desert.icon.png",
    "Desert",
    " rgba(84, 20, 9, 0.826)"
  )
);
const imgContainers = document.querySelectorAll(".img-container");
for (let i = 0; i < imgContainers.length; i++) {
  const container = imgContainers[i];
  const article = articles[i];
  const wrapper = document.createElement("div");
  wrapper.classList.add("tile-wrapper");
  wrapper.id = "tiles";
  container.appendChild(wrapper);
  const newHover = new Hover(container, wrapper, article);
  newHover.init();
  newHover.addStyle();
  hovers.push(newHover);
}
window.onresize = function () {
  for (const hover of hovers) {
    hover.createGrid();
  }
};
