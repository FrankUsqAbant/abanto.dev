/**
 * Genera el monograma FA con la misma letra de la cabecera
 * (glifos de La Belle Aurore convertidos a trazos, sin dependencia de fuentes)
 * en la baldosa crema del sitio. Uso: node scripts/generate-icons.mjs [dir]
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const CREAM = "#F4F2EE";
const INK = "#141414";
const OLIVE = "#5B7B5A";

/** Trazos de las mayúsculas F y A de La Belle Aurore (la firma del navbar). */
const F_PATH = `M12 91Q12 97 12.0 106.0Q12 115 14.0 123.5Q16 132 20.0 138.0Q24 144 32 144Q40 144 49.5 129.5Q59 115 74.0 97.5Q89 80 111.5 65.5Q134 51 168 51Q194 51 230.0 59.0Q266 67 304.5 81.5Q343 96 380.5 116.5Q418 137 448.0 161.5Q478 186 496.5 213.5Q515 241 515 271Q479 271 446.0 263.0Q413 255 373 255Q373 264 376.0 272.5Q379 281 389 285L570 362L597 389Q601 399 612.0 423.0Q623 447 635.5 473.5Q648 500 659.0 524.0Q670 548 675 557Q675 558 679.0 564.0Q683 570 687.5 576.5Q692 583 695.5 588.5Q699 594 700 596Q700 604 699.0 610.0Q698 616 687 623Q592 588 504.0 558.5Q416 529 325 493Q324 493 321.5 492.5Q319 492 317 492Q309 492 303.5 498.0Q298 504 298 512Q298 522 331.5 542.5Q365 563 416.0 586.5Q467 610 528.5 635.0Q590 660 646.0 680.5Q702 701 745.0 714.0Q788 727 803 727Q824 727 840.0 717.0Q856 707 856 681Q856 673 851.5 668.0Q847 663 840.5 659.5Q834 656 827.5 653.5Q821 651 817 648Q811 643 801.0 633.0Q791 623 780.5 613.0Q770 603 762.0 594.5Q754 586 753 584Q744 569 730.5 542.5Q717 516 705.0 489.0Q693 462 684.0 440.5Q675 419 675 415V396Q679 396 689.5 398.5Q700 401 711.0 402.0Q722 403 730.5 399.0Q739 395 739 382Q739 370 726 362Q721 360 708.5 354.5Q696 349 681.5 343.0Q667 337 654.0 331.5Q641 326 636 324Q592 252 543.5 192.0Q495 132 436.5 89.5Q378 47 306.5 23.0Q235 -1 147 -1Q128 -1 104.5 4.0Q81 9 60.5 20.5Q40 32 26.0 49.5Q12 67 12 91Z`;
const A_PATH = `M660 45Q660 70 663.5 95.0Q667 120 671.5 144.5Q676 169 679.5 194.5Q683 220 683 246Q650 246 626.0 243.0Q602 240 579.0 237.0Q556 234 530.0 232.5Q504 231 467 233Q440 203 405.5 169.0Q371 135 332.0 106.0Q293 77 250.0 57.5Q207 38 163 38Q133 38 105.5 48.0Q78 58 57.0 76.0Q36 94 24.0 119.5Q12 145 12 176Q12 192 17.5 200.5Q23 209 41 209Q50 209 57.0 192.5Q64 176 75.5 155.5Q87 135 105.0 118.5Q123 102 154 102Q192 102 228.5 116.5Q265 131 298.5 153.5Q332 176 361.5 204.0Q391 232 415 259Q412 284 397.0 296.0Q382 308 365.5 320.0Q349 332 336.0 352.0Q323 372 323 415Q323 476 360.0 510.5Q397 545 461 545Q480 545 498.5 541.0Q517 537 536.0 531.5Q555 526 573.5 522.0Q592 518 611 518Q623 518 630.5 521.0Q638 524 644.0 530.0Q650 536 657.0 546.0Q664 556 675 570Q681 578 693.5 595.5Q706 613 721.0 634.5Q736 656 753.0 680.0Q770 704 785.0 726.0Q800 748 812.0 765.0Q824 782 829 791Q840 800 849.0 802.5Q858 805 870 805Q882 805 888.0 796.5Q894 788 895.5 776.0Q897 764 896.5 751.5Q896 739 896 732Q896 729 896.0 722.5Q896 716 895.5 709.0Q895 702 895.0 695.5Q895 689 895 687Q892 677 885.5 657.0Q879 637 871.0 611.5Q863 586 854.5 558.0Q846 530 838.5 504.0Q831 478 825.0 458.0Q819 438 817 428Q816 423 814.0 412.0Q812 401 810.0 388.5Q808 376 806.0 365.0Q804 354 804 350Q813 348 822.0 344.0Q831 340 831 331Q831 321 823.5 315.0Q816 309 806.0 304.0Q796 299 787.5 292.0Q779 285 778 272Q776 260 771.0 228.5Q766 197 759.5 161.5Q753 126 747.5 95.0Q742 64 739 52Q738 49 735.0 41.0Q732 33 728.0 25.0Q724 17 720.0 10.0Q716 3 714 0Q690 5 675.0 12.5Q660 20 660 45ZM643 429Q631 429 609.5 412.0Q588 395 567.0 372.5Q546 350 530.0 327.5Q514 305 514 294Q520 294 537.5 294.5Q555 295 574.5 295.5Q594 296 611.5 297.0Q629 298 636 298Q640 298 648.5 300.0Q657 302 665.0 304.0Q673 306 679.5 308.0Q686 310 687 311Q688 311 688.0 317.5Q688 324 688 328Q688 336 685.5 353.0Q683 370 677.5 387.0Q672 404 663.5 416.5Q655 429 643 429ZM362 428Q362 414 372.0 396.0Q382 378 397.0 362.0Q412 346 429.0 335.0Q446 324 461 324Q475 324 494.0 341.0Q513 358 530.5 380.5Q548 403 560.0 424.0Q572 445 572 453Q572 470 560.5 478.5Q549 487 533.5 490.5Q518 494 501.0 494.0Q484 494 473 494Q459 494 439.5 491.5Q420 489 403.0 482.0Q386 475 374.0 462.0Q362 449 362 428ZM662 479Q684 453 703.0 423.0Q722 393 739 362L828 682Z`;

/** Marca FA en un lienzo 128², sin fondo (el caller pone el crema). */
const mark = `
  <g transform="translate(-0.96748,96.41068) scale(0.08062357,-0.08062357)">
    <path fill="${INK}" d="${F_PATH}"/>
    <path fill="${OLIVE}" transform="translate(703,0)" d="${A_PATH}"/>
  </g>
`.trim();

const svgFor = ({ size, pad, radius }) => {
  const inner = size - pad * 2;
  const r = radius == null ? 0 : radius;
  const bg =
    r > 0
      ? `<rect width="${size}" height="${size}" rx="${r}" fill="${CREAM}"/>`
      : `<rect width="${size}" height="${size}" fill="${CREAM}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  ${bg}
  <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 128 128">${mark}</svg>
</svg>`;
};

const icoFromPngs = (pngs) => {
  const header = 6 + 16 * pngs.length;
  let offset = header;
  const entries = [];
  for (const { size, buffer } of pngs) {
    entries.push({ size, buffer, offset, bytes: buffer.length });
    offset += buffer.length;
  }
  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(pngs.length, 4);
  let e = 6;
  for (const ent of entries) {
    out.writeUInt8(ent.size >= 256 ? 0 : ent.size, e);
    out.writeUInt8(ent.size >= 256 ? 0 : ent.size, e + 1);
    out.writeUInt8(0, e + 2);
    out.writeUInt8(0, e + 3);
    out.writeUInt16LE(1, e + 4);
    out.writeUInt16LE(32, e + 6);
    out.writeUInt32LE(ent.bytes, e + 8);
    out.writeUInt32LE(ent.offset, e + 12);
    e += 16;
  }
  for (const ent of entries) {
    ent.buffer.copy(out, ent.offset);
  }
  return out;
};

const raster = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

const DIR = process.argv[2] ? join(process.argv[2]) : PUBLIC;
await mkdir(DIR, { recursive: true });

const faviconSvg = svgFor({ size: 32, pad: 1.2, radius: 8 });
await writeFile(join(DIR, "favicon.svg"), faviconSvg, "utf8");

const tile16 = await raster(svgFor({ size: 32, pad: 1.2, radius: 8 }), 16);
const tile32 = await raster(svgFor({ size: 32, pad: 1.2, radius: 8 }), 32);
await writeFile(join(DIR, "favicon.ico"), icoFromPngs([
  { size: 16, buffer: tile16 },
  { size: 32, buffer: tile32 },
]));

const appSvg = svgFor({ size: 512, pad: 76, radius: 0 });
await writeFile(join(DIR, "apple-touch-icon.png"), await raster(appSvg, 180));
await writeFile(join(DIR, "icon-192.png"), await raster(appSvg, 192));
await writeFile(join(DIR, "icon-512.png"), await raster(appSvg, 512));

const previewOut = process.argv[3];
if (previewOut) {
  const previewSvg = svgFor({ size: 512, pad: 48, radius: 96 });
  await writeFile(previewOut, await raster(previewSvg, 512));
  console.log("preview written to", previewOut);
}

console.log("icons written to", DIR);
