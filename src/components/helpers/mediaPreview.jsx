function MediaPreview(prop) {
  const scale = 100 / prop.croppedArea.width;
  const transform = {
    x: `${-prop.croppedArea.x * scale}%`,
    y: `${-prop.croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale}, 1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <div className="output">
      <img src={prop.previewBlob} alt="" style={imageStyle} />
    </div>
  );
}

export default MediaPreview;
