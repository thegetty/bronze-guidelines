const fs = require('fs');
const inkjet = require('inkjet');

const fileName = process.argv[2]

const csv = fileName.concat('.csv')
const jpg = fileName.concat('.jpg')
const outputFile = fileName.concat('--points.ply')

// Load color data from the JPG
let imgData
inkjet.decode(fs.readFileSync(jpg), function(err, decoded) {
  if (err) {
    console.error(err);
    return;
  }
  imgData = decoded.data 
});

// Load coordinate data from the CSV
fs.readFile(csv, 'utf8', (err, coordinateData) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the color and coordinate data into rows
  const coordinateRows = coordinateData.split('\n');
  let colorRows = []
  const rgbaColorValues = 4
  for (let index = 0; index < imgData.length; index += (imgData.length / coordinateRows.length)) {
    colorRows.push(imgData.slice(index, index + (imgData.length / coordinateRows.length)))
  }

  let vertexList = ''
  let headerElements = ''
  for (const [index, row] of coordinateRows.entries()) {
    // Assign the y value as the row number
    let rowIndex = index
    let y = index + 1

    // Split the color and coordinate row data into points
    const coordinateRowPoints = row.split(',')
    let colorRowPoints = []
    for (let index = 0; index < colorRows[rowIndex].length; index += rgbaColorValues) {
      colorRowPoints.push(colorRows[rowIndex].slice(index, index + rgbaColorValues))
    }

    for (const [index, point] of coordinateRowPoints.entries()) {
      // Assign the x value as the point number, and the z as the data value from the CSV
      const x = index + 1
      const z = point

      // Get the corresponding color data and break out the r, g, and b values
      const rgba = colorRowPoints[index]
      const r = rgba[0]
      const g = rgba[1]
      const b = rgba[2]

      // Write the values to a string that will be a vertex in the PLY file
      const vertex = x.toString().concat(' ',y.toString(),' ',z.toString(),' ',r.toString(),' ',g.toString(),' ',b.toString(),'\n')
      
      vertexList += vertex
    }
    
    // Write all the required PLY file header information
    const vertexCount = coordinateRows.length * coordinateRowPoints.length
    const fileHeader = 'ply'
    headerElements = fileHeader.concat('\nformat ascii 1.0\nelement vertex ',vertexCount,'\nproperty float x\nproperty float y\nproperty float z\nproperty uchar red\nproperty uchar green\nproperty uchar blue\nelement face 0\nproperty list uchar int vertex_index\nend_header\n')
  }

  // Write the file with it header
  fs.writeFile(outputFile, headerElements, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
  // Append the list of vertices to the file
  fs.appendFile(outputFile, vertexList, err => {
    if (err) {
      console.error(err);
      return;
    } 
  });

});

