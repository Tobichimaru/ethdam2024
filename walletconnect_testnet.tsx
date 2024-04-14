const font = fetch("https://fonts.cdnfonts.com/css/nunito").body;

const Theme = styled.div`
  ${font}

  a,
  button {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer;
  }

  .btn {
    font-family: "Nunito", sans-serif;
    font-weight: 800 !important;
    border-style: solid;
    border-width: 4px;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer;
  }

  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    .btn {
      border-image-repeat: space;
    }
  }

  @supports (-moz-appearance: meterbar) {
    .btn {
      border-image-repeat: stretch;
    }
  }

  .btn::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #006bb3;
  }

  .btn:hover {
    color: #fff;
    text-decoration: none;
    background-color: #108de0;
  }

  .btn:hover::after {
    box-shadow: inset -6px -6px #006bb3;
  }

  .btn:active:not(.is-disabled)::after {
    box-shadow: inset 4px 4px #006bb3;
  }

  .btn:focus {
    outline: 0;
  }

  .btn {
    border-radius: 0 !important;
    border-image-slice: 2 !important;
    border-image-width: 2 !important;
    border-image-repeat: stretch !important;
    border-image-source: url('data:image/svg+xml;utf8,<svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>') !important;
    border-image-outset: 2;
    position: relative;
    display: inline-block;
    padding: 6px 8px;
    margin: 4px;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    background-color: #209cee !important;
    font-weight: 700;
  }
`;

return (
  <Theme>
    <Web3Connect
      connectLabel={props.connectLabel}
      disconnectLabel={props.disconnectLabel}
      connectingLabel={props.connectingLabel}
    />
  </Theme>
);
