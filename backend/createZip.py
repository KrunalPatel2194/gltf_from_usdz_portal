# import required modules
 
import os
import sys
import zipfile
 
# Declare the function to return all file paths of a particular directory
def retrieve_file_paths(dirName):
 
  # setup file paths variable
  filePaths = []
   
  # Read all directory, subdirectories and file lists
  for root, directories, files in os.walk("/usdz/"+dirName):
    for filename in files:
      # Create the full filepath by using os module.
      filePath = os.path.join(root, filename)
      filePaths.append(filePath)
       
  # return all paths
  return filePaths
 
 
# Declare the main function
def main():
 
  # Set the directory name from command argument
  dir_name = sys.argv[1]
   
  # Set the zip file name
  zipFileName = dir_name + ".zip"
   
  # Call the function to retrieve all files and folders of the assigned directory
  filePaths = retrieve_file_paths(dir_name)
   
#   # print the list of files to be zipped
#   print('The following list of files will be zipped:')
#   for fileName in filePaths:
#     print(fileName)
   
  # write files and folders to a zipfile
  zip_file = zipfile.ZipFile(zipFileName, 'w')
  with zip_file:
    # write each file seperately
    for file in filePaths:
      zip_file.write(file)
       
  print(zipFileName+' file is created successfully!')
   
# Call the main function
if __name__ == "__main__":
  main()