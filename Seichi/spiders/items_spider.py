import scrapy
from urllib.parse import unquote
import requests
import re

# TODO support [台湾] in ラブひな
# TODO support 『空想お散歩MAP』 in 3月のライオン
# TODO dynamicly add more jl
class ItemsSpider(scrapy.Spider):
    name = 'items'
    key = 0
    with open('./apikey', 'r') as f:
        api_key = f.read()

    def start_requests(self):
        yield scrapy.Request(url='https://legwork.g.hatena.ne.jp/', callback=self.parse)

    def parse(self, response):
        for href in response.css('div.recentsubtitles a::attr(href)')[:30]:
            yield response.follow(href, self.parse_detail)

    def parse_detail(self, response):
        places = self.standardize(
             response.css('div.body').re('「.*?」'))
        title = response.css('span.title::text').get()
        url = unquote(response.request.url)
        for place in places:
            lat, lng = self.get_geo_location(place).values()
            res = {
                'key': self.key,
                'title': title,
                'placename': place,
                'url': url,
                'lat': lat,
                'lng': lng
                }
            self.key += 1
            yield res

    def standardize(self, lst):
        '''
        Trim
        Split
        Flattern
        Remove html
        Remove duplicates
        '''
        trimmed_lst = [x[1:-1].split('，') for x in lst]
        return set([re.sub('<.*?>', '', i) for x in trimmed_lst for i in x])

    def get_geo_location(self, placename):
        base_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
        inputtype = 'textquery'
        fields = 'geometry/location'
        api_url = ('inputtype=' + inputtype +
         '&fields=' + fields +
         '&input=' + placename +
         '&key=' + self.api_key)
        result = requests.get(base_url + api_url).json()
        if result['status'] == 'OK':
            return result['candidates'][0]['geometry']['location']
        else:
            return {'lat': None, 'lng': None}