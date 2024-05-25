class ColorConversion {
  // Converts a hex color code to an RGBA string
  static convertHexToRGBA = (hexCode: string, opacity = 1) => {
    // Remove the leading # if present
    let hexValue = hexCode.replace('#', '');

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hexValue.length === 3) {
      hexValue = `${hexValue[0]}${hexValue[0]}${hexValue[1]}${hexValue[1]}${hexValue[2]}${hexValue[2]}`;
    }

    // Convert hex to RGB values
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }

    // Return the RGBA string
    return `rgba(${r},${g},${b},${opacity})`;
  };
}

export default ColorConversion;
