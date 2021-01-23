import os
import zipfile
zip_dir = "./gltf";
for subdir, dirs, files in os.walk(zip_dir):
    for zipp in files:
        old_file_name = zipp;
        file_name = (zipp.split('.')[0]).split(" ").join("_");
        filepath= os.path.join(subdir, zipp);
        zip_ref = zipfile.ZipFile(filepath, 'r')
        os.mkdir(zip_dir+"/"+file_name);
        zip_ref.extractall(zip_dir+"/"+file_name);
        zip_ref.close();
        os.remove(zip_dir+"/"+old_file_name);
        print("files extracted and .zip file deleted successfuly");
