import json

with open('./Words_Gematria.json', 'r') as f:
    dictionary-orig = json.load(f)

with open('./Words_Gematria.json', 'r') as f:
    dictionary = json.load(f)

for word in dictionary:
    word['translation'] = google_translate(word['word'])

dictionary.update(dictionary-orig)

with open('dict.json', 'w') as f:
    json.dump(dictionary, f, indent=4, ensure_ascii=False)
