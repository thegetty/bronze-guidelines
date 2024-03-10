// This version of the script assigns color to both the vertices and faces
// The vertices needs color on the vertices, also having on the faces seems 
// to give some exposure control once it's converted to glTF for <mode-viewer>
//
const fs = require('fs');
const inkjet = require('inkjet');

const fileName = process.argv[2]

const csv = fileName.concat('.csv')
const jpg = fileName.concat('.jpg')
const outputFile = fileName.concat('.ply')

// Load data from the JPG
let imgData
let imgWidth
let imgHeight
inkjet.decode(fs.readFileSync(jpg), function(err, decoded) {
  if (err) {
    console.error(err);
    return;
  }
  imgData = decoded.data 
  imgWidth = decoded.width
  imgHeight = decoded.height
});

const totalVertices = imgWidth * imgHeight
const totalFaces = (imgWidth - 1) * (imgHeight - 1)

// Load coordinate data from the CSV
fs.readFile(csv, 'utf8', (err, coordinateData) => {
  if (err) {
    console.error(err);
    return;
  }

  // WRITE THE VERTICES
  // ------------------
  // Split the color and coordinate data into rows
  // als remove errant zero-width space from csv data
  const coordinateRows = coordinateData.replace('﻿','').split('\n');
  let colorRows = []
  const rgbaColorValues = 4
  for (let index = 0; index < imgData.length; index += (imgData.length / coordinateRows.length)) {
    colorRows.push(imgData.slice(index, index + (imgData.length / coordinateRows.length)))
  }

  let vertexList = ''
  let faceList = ''
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
  }

  // WRITE THE FACES
  // ------------------
  // Define the starting values of each point that makes up the face
  let quad1 = 0
  let quad2 = 1
  let quad3 = 1 + imgWidth
  let quad4 = 0 + imgWidth

  // Split the image data into RGBA color arrays for each point
  let colorRowPoints = []
  for (let index = 0; index < imgData.length; index += rgbaColorValues) {
    colorRowPoints.push(imgData.slice(index, index + rgbaColorValues))
  }

  // Set up some counters
  let faceIndex = 0
  let pointIndex = 0
  let colorIndex = 0
  let rowBreak = imgWidth - 2

  while (faceIndex < totalFaces) {
    // Get the corresponding color data and break out the r, g, and b values
    const rgba = colorRowPoints[colorIndex]
    const r = rgba[0]
    const g = rgba[1]
    const b = rgba[2]

    // Set 4 as the starting value of the face to indicate a quadrilateral
    let num = 4
    let text = num.toString();

    // Write the values to a string that will be a face in the PLY file
    const face = text.concat(' ',quad1.toString(),' ',quad2.toString(),' ',quad3.toString(),' ',quad4.toString(),' ',r.toString(),' ',g.toString(),' ',b.toString(),'\n')

    faceList += face

    // Update the various counters
    if (pointIndex == (imgWidth - 2)) {
      quad1 = quad1 + 2
      quad2 = quad2 + 2
      quad3 = quad3 + 2
      quad4 = quad4 + 2

      pointIndex = 0
      faceIndex++
    } else {
      quad1++
      quad2++
      quad3++
      quad4++

      pointIndex++
      faceIndex++
    }
    if (colorIndex == rowBreak) {
      colorIndex = colorIndex + 2
      rowBreak = rowBreak + imgWidth
    } else {
      colorIndex++
    }
  }
  
  // Write all the required PLY file header information
  const fileHeader = 'ply'
  headerElements = fileHeader.concat('\nformat ascii 1.0\nelement vertex ',totalVertices,'\nproperty float x\nproperty float y\nproperty float z\nproperty uchar red\nproperty uchar green\nproperty uchar blue\nelement face ',totalFaces,'\nproperty list uchar int vertex_index\nproperty uchar red\nproperty uchar green\nproperty uchar blue\nend_header\n')

  // Write the file with it header
  fs.writeFile(outputFile, headerElements, err => {
    if (err) {
      console.error(err);
      return;
    }

     // Append the list of vertices to the file
    fs.appendFile(outputFile, vertexList, err => {
      if (err) {
        console.error(err);
        return;
      } 

      // Append the list of faces to the file
      fs.appendFile(outputFile, faceList, err => {
        if (err) {
          console.error(err);
          return;
        } 
      });
    });
  });
});
