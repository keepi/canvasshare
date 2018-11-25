const wrapText = ({
  ctx,
  text,
  x,
  y,
  w,
  fontStyle: {
    lineHeight = 60,
    textAlign = 'left',
    textBaseline = 'top',
    font = 'normal 40px arial',
    fillStyle = '#000'
  }
}) => {
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const chr = text.split('');
    const row = [];
    let temp = '';

    for (let a = 0 ; a < chr.length ; a++) {
        if (ctx.measureText(temp).width<w) { } else {
          if (/[，。！》]/im.test(chr[a])) {
            temp += ` ${chr[a]} `;
            a++;
        }

        if (/[《]/im.test(chr[a-1])) {
            temp = temp.substr(0, temp.length -1);
            a--;
        }

        row.push(temp);
        temp = '';
      }
        temp += chr[a] ? chr[a]: '';
    }
    row.push (temp);
    for(let b = 0 ; b < row.length ; b++) {
        ctx.fillText(row[b], x, y+b*lineHeight)

    }
    
    ctx.restore();
    return y+(row.length-1)*lineHeight
}
module.exports = {
	wrapText: wrapText
}