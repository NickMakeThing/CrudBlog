import os
number = 0
for filename in sorted(os.listdir('.')):
    if '.jpg' in filename:
        os.rename(filename, 'testImg'+str(number)+'.jpg')
        number+=1