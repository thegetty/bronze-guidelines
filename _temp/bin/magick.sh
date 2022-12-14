#!/bin/bash

# Convert images to JPGs at 80% quality and a maximum pixel dimension of 1800px (web and print ready) and apply a consisent color profile to them.
# Create JPGs of those same images at 100% quality and sized to optimize IIIF processing where applicable
# Create a figures.csv file with basic image info that can be converted for use in figures.yml
# Create a figures.yml file ready for use in Quire that includes the figure id, src, and if IIIF, the media_type and iiif information.

defaultSize=400
defaultQuality=80

prepIIIF=true # resize images to later process with `quire process --iiif`
outputYAML=false # output a figures.yml file
outputCSV=false # output a CSV file that can be used as a basis for figures.yml
quietMode=false # supress ImageMagick warnings about image files

baseDir=static/img
inputDir=magick--redo
figureOutputDir=figures
iiifOutputDir=iiif
# iiifTilesDir='/img/'$iiifOutputDir'/processed/' # default Quire output
iiifTilesDir='https://www.getty.edu/publications/resources/bronze-guidelines/' # Getty AWS S3 hosting

# color profiles to use
colorProfile=bin/magick/adobe-rgb-1998.icm
bwProfile=bin/magick/gray-gamma-2-2.icm

# crop sizes for IIIF tiling
# currently only 6 layers are supported in Quire
iiif4Layers=2304
iiif5Layers=4352
iiif6Layers=8448
# iiif7Layers=16640
# iiif8Layers=33024

create_directory()
{
  dir=$1

  if [ -d "$baseDir/$dir" ]
  then
      :
  else
      mkdir "$baseDir/$dir"
  fi
}

add_to_csv()
{
file=$1
type=$2

if [ $outputCSV == true ]
then
  if [ "$type" == "iiif" ]
  then
    printf '\n\"'$1'\", \"'$figureOutputDir'/'$1'.jpg\", iiif, \"'$iiifTilesDir$1'/info.json\"' >> bin/magick/figures.csv
  else
    printf '\n\"'$1'\", \"'$figureOutputDir'/'$1'.jpg\", ,' >> bin/magick/figures.csv
  fi
fi
}

add_to_yaml()
{
file=$1
type=$2

if [ $outputYAML == true ]
then
  if [ "$type" == "iiif" ]
  then
    printf '\n\n  - id: \"'$1'\"\n    src: \"'$figureOutputDir'/'$1'.jpg\"\n    media_type: iiif\n    iiif: \"'$iiifTilesDir$1'/info.json\"\n    alt: \"\"\n    label: \"\"\n    caption: \"\"\n    credit: \"\"' >> bin/magick/figures.yml
  else
    printf '\n\n  - id: \"'$1'\"\n    src: \"'$figureOutputDir'/'$1'.jpg\"\n    alt: \"\"\n    label: \"\"\n    caption: \"\"\n    credit: \"\"' >> bin/magick/figures.yml
  fi
fi
}

if ! command -v magick &> /dev/null
then
  printf 'This script requires ImageMagick, please download and install it from https://imagemagick.org/script/download.php before proceeding\n'
  exit
fi

if [ $outputCSV == true ]
then
  if [ $prepIIIF == true ]
  then
    printf 'id, src, media_type, iiif' > bin/magick/figures.csv
  else
    printf 'id, src' > bin/magick/figures.csv
  fi
fi

if [ $outputYAML == true ]
then
  printf 'figure_list:' > bin/magick/figures.yml
fi

if [ $prepIIIF == true ]
then
create_directory $iiifOutputDir
fi

create_directory $figureOutputDir

for img in $baseDir/$inputDir/*
do

  colorSpace=`magick identify -quiet -format "%[colorspace]" $img`
  maxDim=`magick identify -quiet -format "%[fx:max(w,h)]" $img`
  fileName=`magick identify -quiet -format "%t" $img`

  if [ $colorSpace == "Gray" ]
  then
    profile=$bwProfile
  else
    profile=$colorProfile
  fi

  if [ $quietMode == true ]
  then
    mode='-quiet'
  else
    mode=''
    if [ $maxDim -lt $defaultSize ]
    then
      printf '\n'$fileName', '$maxDim'px\n'
    else
      printf '\n'$fileName'\n'
    fi
  fi

  magick $mode $img -resize $defaultSize'x'$defaultSize'>' -quality $defaultQuality -layers flatten -profile $profile -set filename:name '%t' $baseDir/$figureOutputDir/'%[filename:name].jpg'

  if [ $prepIIIF == true ]
  then

    if [ $maxDim -lt $iiif4Layers ]
    then
      add_to_csv $fileName
      add_to_yaml $fileName
    elif [ $maxDim -lt $iiif5Layers ]
    then
      magick -quiet $img -resize $iiif4Layers'x'$iiif4Layers -layers flatten -profile $profile -set filename:name '%t' $baseDir/$iiifOutputDir/'%[filename:name].jpg'
      add_to_csv $fileName iiif
      add_to_yaml $fileName iiif
    elif [ $maxDim -lt $iiif6Layers ]
    then
      magick -quiet $img -resize $iiif5Layers'x'$iiif5Layers -layers flatten -profile $profile -set filename:name '%t' $baseDir/$iiifOutputDir/'%[filename:name].jpg'
      add_to_csv $fileName iiif
      add_to_yaml $fileName iiif
    else
      magick -quiet $img -resize $iiif6Layers'x'$iiif6Layers -layers flatten -profile $profile -set filename:name '%t' $baseDir/$iiifOutputDir/'%[filename:name].jpg'
      add_to_csv $fileName iiif
      add_to_yaml $fileName iiif
    fi

  else
    add_to_csv $fileName
    add_to_yaml $fileName
  fi

done