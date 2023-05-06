import gpxpy
import gpxpy.gpx
from django.contrib.gis.geos import Point, LineString

# Parsing an existing file:
# -------------------------

def parse_gpx(gpxfile):
    gpx_file = gpxfile

    gpx = gpxpy.parse(gpx_file)

    storage_array = []
    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                pnt = Point(point.latitude, point.longitude, point.elevation)
                storage_array.append(pnt)
    
    ls = LineString(storage_array)
    return(ls)

def naive_elevation(linestring):
    zarray = []
    for point in linestring.coords:
        zarray.append(point[2])

        endpoint = len(zarray)

    ele = 0
    for z in range(endpoint-1):
        z0= zarray[z]
        z1 = zarray[z+1]
        delta = z1-z0 
        if delta > 0:
            ele += delta

    return ele
    # There are many more utility methods and functions:
    # You can manipulate/add/remove tracks, segments, points, waypoints and routes and
    # get the GPX XML file from the resulting object:
