import { Selection, create } from 'd3-selection';
import { saveAs } from 'file-saver';

export abstract class Chart {
  public width: number;
  public height: number;
  abstract name: string;
  public svg: Selection<SVGSVGElement, undefined, null, undefined>;

  public margin = {
    top: 30,
    left: 40,
    bottom: 30,
    right: 0
  };

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.svg = create('svg')
                .attr('viewBox', `0 0 ${this.width} ${this.height}`);
  }

  public download () {
    let node = this.svg.node();
    const width = this.width * 2;
    const height = this.height * 2;
    if (node !== null) {
      node = node.cloneNode(true) as SVGSVGElement;
      node.setAttribute('width', `${width}`);
      node.setAttribute('height', `${height}`);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const data = new XMLSerializer().serializeToString(node);
      const image = new Image();
      const blob = new Blob([data], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      image.addEventListener('load', () => {
        const context = canvas.getContext('2d');
        if (context !== null) {
          context.drawImage(image, 0, 0, width, height);
          URL.revokeObjectURL(url);
          const uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
          saveAs(uri, `${this.name}.png`);
        }
      });
      image.src = url;
    }
  }
}