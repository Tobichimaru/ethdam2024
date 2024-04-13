const title = props.title || "No Title";
const img = props.img || "https://docs.near.org/assets/images/protocol-b73c2a3ace3307226ee7eb2149ee432f.png";
const text = props.text || "A simple product";
const link = props.link || "#";
const price = props.price || "1";

if (text.length > 100) text = text.slice(0, 100) + "...";

const Preview = styled.a`
  &{
    color: black;
  }

  &:hover {
    text-decoration: none;
    color: black;
  }

  img {
    min-width: "100%",
    height: "auto"
  }

  .img-container {
    max-height: "8rem",
    overflow: "hidden"
  }

  .card:hover {
    -webkit-transform: translateY(-0.3em);
    -moz-transform: translateY(-0.3em);
    -o-transform: translateY(-0.3em);
    -ms-transform: translateY(-0.3em);
    transform: translateY(-0.3em);
  }
`

return <>
  <Preview href={link}>
    <div class="card mb-4" >
      <div class="img-container" style={styles.imgContainer}>
        <img class="card-img-top" src={img} style={styles.img} alt="Card image" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text"> {text} </p>
      </div>
      <div class="card-footer text-muted">
        <div class="row">
          <div class="col-8 col-10-md">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star"></i>
          </div>
          <div class="col-4 col-2-md text-right">
            <p class="text-right p-0 m-0">{price} Ⓝ</p>
          </div>
        </div>
      </div>
    </div>
  </Preview>
</>