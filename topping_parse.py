import json
import sys
import os

json_file = ""
with open('ingred_dump.json', 'r+') as json_open:
    json_file = json_open.read()

print json_file

toppings_json = json.loads(json_file)

arranged_toppings = dict()
for topping in toppings_json:
    if topping.Tags.Sauce:
        print "Sauce!"
        if "sauce" in arranged_toppings:
            arranged_toppings["sauce"].append((topping.Name, topping.Code,))
        else:
            arranged_toppings["sauce"] = [(topping.Name, topping.Code,)]

        continue
    if topping.Tags.Cheese:
        print "Cheese!"
        if "cheese" in arranged_toppings:
            arranged_toppings["cheese"].append((topping.Name, topping.Code,))
        else:
            arranged_toppings["cheese"] = [(topping.Name, topping.Code,)]

        continue
    if topping.Tags.Meat:
        print "Meat!"
        if "meat" in arranged_toppings:
            arranged_toppings["meat"].append((topping.Name, topping.Code,))
        else:
            arranged_toppings["meat"] = [(topping.Name, topping.Code,)]

        continue
    if topping.Tags.Vege:
        print "Vege!"
        if "vege" in arranged_toppings:
            arranged_toppings["vege"].append((topping.Name, topping.Code,))
        else:
            arranged_toppings["vege"] = [(topping.Name, topping.Code,)]

        continue
    if topping.Tags.NonMeat:
        print "NonMeat!"
        if "nonmeat" in arranged_toppings:
            arranged_toppings["nonmeat"].append((topping.Name, topping.Code,))
        else:
            arranged_toppings["nonmeat"] = [(topping.Name, topping.Code,)]

        continue

dump = json.dumps(arranged_toppings)
with open('dump.json', 'w+') as topping_json:
    topping_json.write(dump)
