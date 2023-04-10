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


    # There are many more utility methods and functions:
    # You can manipulate/add/remove tracks, segments, points, waypoints and routes and
    # get the GPX XML file from the resulting object:
