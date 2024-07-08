from dotenv import load_dotenv
import os

import requests
from bs4 import BeautifulSoup
# from PIL import Image

import pandas as pd

# load env variables
load_dotenv()
username = os.getenv('USERNAME')

def scrape_film(link):
  cleantitle = link.replace('-', '')

  URL = f'https://letterboxd.com/film/{link}/'
  page = requests.get(URL)

  soup = BeautifulSoup(page.content, 'html.parser')

  # film header
  header = soup.find('section', class_='film-header-group')

  title = header.find('h1', class_='filmtitle').find('span').text
  year = int(header.find('div', class_='releaseyear').find('a').text)
  directorlist = []
  directors = header.find('span', class_='directorlist').find_all('a', class_='contributor')
  for director in directors:
    directorlist.append(director.text)

  # details
  runtime = int(soup.find('p', class_='text-link text-footer').text.strip().split(' ')[0][:-5]) # in minutes

  genrelist = []
  genres = soup.find('div', id='tab-genres').find('div').find_all('a')
  for genre in genres:
    genrelist.append(genre.text)

  castlist = {}
  castmembers = soup.find('div', id='tab-cast').find('div').find_all('a')
  for member in castmembers: # limit number of members to display in html
    actor = member.text
    character = member.get('title')
    castlist.update({actor: character})

  synopsis = soup.find('div', class_='review body-text -prose -hero prettify')
  tagline = synopsis.find('h4').text
  summary = synopsis.find('p').text

  # rating
  SUBURL = f'https://letterboxd.com/{username}/film/{link}/activity'
  subpage = requests.get(SUBURL)
  subsoup = BeautifulSoup(subpage.content, 'html.parser')

  activities = subsoup.find('div', class_='activity-table').find_all('p', class_='activity-summary')
  ratings = []
  for activity in activities:
    activityrating = activity.find('span', class_='rating')
    if activityrating is not None:
      ratings.append(activityrating.text.strip())
  
  ratingstars = ratings[0]
  rating = len(ratingstars)
  if ratings[-1] == '½':
    rating -= 0.5
  
  # save poster image
  # image_url = soup.find('img', class_='image')['src']
  # img = Image.open(requests.get(image_url, stream=True).raw)
  # img.save(f'./src/assets/posters/{cleantitle}{year}.jpg', 'jpeg')
  
  data = {
    # id
    'slug': link,

    # metadata
    'title': title,
    'year': year,
    'directorlist': directorlist,
    'runtime': runtime,
    'genrelist': genrelist,
    'castlist': castlist,
    'tagline': tagline,
    'summary': summary,
    'ratingstars': ratingstars,
    'rating': rating,

    # media
    'posterpath': f'/src/assets/posters/{cleantitle}{year}.jpg',
    'stillpaths': [
      f'/src/assets/stills/{cleantitle}01.jpg',
      f'/src/assets/stills/{cleantitle}02.jpg',
      f'/src/assets/stills/{cleantitle}03.jpg',
    ],

    # manual entry
    'caption': '',
    'analysis': '',
    'quote': '',

    'color': '',
  }
  df = pd.DataFrame([data])

  return df

# scrape data from films
links = [
  'good-will-hunting',
  'aftersun'
]

# one json file per film
for link in links:
  df = scrape_film(link)

  directory = './src/content/film'
  if not os.path.exists(directory):
    os.makedirs(directory)

  filename = link + '.json'
  path = directory + '/' + filename

  df.to_json(path, orient='records', indent=4)
  del df
