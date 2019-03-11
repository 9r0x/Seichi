from pprint import pprint

with open('./res.jl') as f:
    pprint(sum([1 for line in f]))