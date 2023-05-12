import requests
from random import choice, randint
import asyncio 

def select_main_image_number():
    selection = choice(main_image_choices)
    main_image_choices.remove(selection)
    return str(selection)
    
def get_lorem_ipsum(paragraphs,words): #args are ints for amounts
    paragraphs_list = []
    for i in range(paragraphs):
        html_data = requests.get("http://www.lipsum.com/feed/xml"+"?amount="+str(words+8)+"&what=words").text
        start = html_data.find('<lipsum>')
        end = html_data.find('</lipsum>')
        generated_text = html_data[start+8:end]
        generated_text_parsed = '.'.join(generated_text.split('.')[1:])[1:]
        paragraphs_list.append(generated_text_parsed)
        # print(len(generated_text_parsed.split(' ')),words)
    if paragraphs > 1:
        return paragraphs_list
    else:
        return paragraphs_list[0]

def create_paragraphs():
    paragraph_list = []
    paragraph_amount = randint(1,2)
    pragraph_dict = {
        'type':'paragraph',
        'content': ''
    }
    text = get_lorem_ipsum(paragraph_amount,randint(68,105))
    if paragraph_amount > 1:
        for paragraph in text:
            dict_copy = pragraph_dict.copy()
            dict_copy['content'] = paragraph
            paragraph_list.append(dict_copy)
        return paragraph_list
    else:
        pragraph_dict['content'] = text
        return pragraph_dict

def select_content_image():
    selection = choice(images)
    images.remove(selection)
    return {
        'type':'image',
        'content':'https://healthstrategy.s3.ap-southeast-2.amazonaws.com/testImg'+str(selection)+'.jpg'
    }

def create_subtitle():
    subtitle = get_lorem_ipsum(1,randint(3,10))[0]
    subtitle.replace('.','')
    return {
        'type':'subtitle',
        'content': get_lorem_ipsum(1,randint(3,10))
    }

async def generate_items(content_list,generator_list,f=0):
    content = choice(generator_list)()
    if isinstance(content, list):
        content_list.extend(content)
    else:
        content_list.append(content)

async def create_content():
    post_length = randint(6,9)
    generators = [
        create_paragraphs,
        select_content_image,
        create_subtitle,
    ]
    generator_type_map = {
        'paragraph':create_paragraphs,
        'image':select_content_image,
        'subtitle':create_subtitle,
    }
    content_list = [
        {
            'type':'paragraph',
            'content': get_lorem_ipsum(1,randint(68,80))
        }
    ]
    
    await generate_items(content_list, generators)
    for i in range(post_length):
        print('generating item {0}/{1}'.format(i+1,post_length))
        if i >= post_length-1: 
            await generate_items(content_list,[create_paragraphs],1)
        else:
            #ensures it doesnt generate content of the same type it used last time
            generators_copy = generators[:]
            previous_content_type = content_list[-1]['type']
            generators_copy.remove(generator_type_map[previous_content_type])
            await generate_items(content_list,generators_copy)
    return content_list

async def create_posts():
    posts = []
    post_count = 0
    while main_image_choices:
        post_count += 1
        print('generating post {0}/{1}'.format(post_count,len(images_numbers)))
        images.extend(images_numbers) #using extend to avoid creating local 'images' var
        main_image_number = select_main_image_number()
        post = {
            'title':get_lorem_ipsum(1,randint(3,7)),
            'description':get_lorem_ipsum(1,randint(10,17)),
            'main_image':'https://healthstrategy.s3.ap-southeast-2.amazonaws.com/testImg'+main_image_number+'.jpg',
            'thumbnail':'https://healthstrategy.s3.ap-southeast-2.amazonaws.com/testImg'+main_image_number+'.jpg',
            'content': await create_content()
        }
        response = requests.post('http://192.168.0.129:8000/POST', json = post)
        print(response.status_code)
        if response.status_code != requests.codes.ok:
            print(response.content, response.reason)
        # posts.append(post)
    return posts

images_numbers = []
for i in range(0,14):
    images_numbers.append(i)

main_image_choices = images_numbers[:]
images = images_numbers[:]
posts = asyncio.run(create_posts())
# print(posts)

"""
#for dino ipsum:
def get_dino_ipsum(paragraphs,words=''):
    if words:
        words = '&words='+str(words)
    response = requests.get('https://dinoipsum.com/api/?format=text'+words+'&paragraphs='+str(paragraphs))
    if response.status_code == requests.codes.ok:
        text = list(filter(lambda line: line != '', response.text.split('\n')))
        # lines = list(set(response.text.split('\n')))
        # lines.remove('')
        if paragraphs > 1:
            return grammify(text)
        else:
            return grammify(text[0]) #will cause error, need to adjust
    else:
        print("Error:", response.status_code, response.text)

def decapitalize(paragraph):
    word_list = paragraph.split(' ')
    first_word = word_list[0]
    other_words = ' '.join(word_list[1:])
    decapitalized_paragraph = first_word + other_words.lower()
    return decapitalized_paragraph

def punctuate(paragraph):
    word_list = paragraph.split(' ')
    next_punctuate = randint(3,15)
    punctuation = choice(['.',','])
    list_size = len(word_list)

    for index in range(list_size-5):
        next_punctuate -= 1
        if next_punctuate < 1 and word_list[index][-1] != '.':
            word_list[index] += punctuation
            next_punctuate = randint(3,15)
            punctuation = choice(['.',','])
    return ' '.join(word_list)

def grammify(paragraph):
    return decapitalize(punctuate(paragraph))
"""
