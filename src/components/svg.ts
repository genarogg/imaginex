const svg = ({ base64 }: any) => {
  const base = `
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200'>
              <filter id='b' color-interpolation-filters='sRGB'>
                <feGaussianBlur stdDeviation='20'/>
                <feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/>
                <feFlood x='0' y='0' width='100%' height='100%'/>
                <feComposite operator='out' in='s'/>
                <feComposite in2='SourceGraphic'/>
                <feGaussianBlur stdDeviation='20'/>
              </filter>
              <image width='100%' height='100%' x='0' y='0' preserveAspectRatio='none' style='filter: url(#b);' href='${base64}'/>
            </svg>
          `;

  const encodedSvg = `data:image/svg+xml;base64,${Buffer.from(base).toString('base64')}`;

  return encodedSvg;
}

export default svg;