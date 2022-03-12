import PdfPrinter from "pdfmake";

export const getPDFReadableStream = (data) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: "Movies \n\n",
        style: "header",
      },
      {
        text: `title: ${data.title}`,
        style: "subheader",
      },
      {
        text: `year: ${data.year}`,
      },
      {
        text: `type: ${data.type}`,
        style: ["bold"],
      },
      {
        text: `imdbId: ${data.imdbId}`,
        style: ["bold"],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      small: {
        fontSize: 8,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();
  return pdfReadableStream;
};
