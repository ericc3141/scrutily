import twitter
import time
from http.server import SimpleHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse

HOST_NAME = 'localhost'
PORT_NUMBER = 8888

class MyHandler(SimpleHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    # Check the URI of the request to serve the proper content.
    def do_GET(self):
        parsed = urlparse.urlparse(self.path)
        if (parsed.path == "/getTimeline"):
            name = urlparse.parse_qs(parsed.query)["name"][0]
            content = twitter.getTimeline(name)
            self.respond(content)
        elif (parsed.path == "/getHashTag"):
            hashTag = urlparse.parse_qs(parsed.query)["hashtag"][0]
            content = twitter.getHashtag(hashTag)
            self.respond(content)
        else:
            super(MyHandler, self).do_GET()  # serves the static src file by default

    def handle_http(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        return bytes(data, 'UTF-8')

    def respond(self, data):
        response = self.handle_http(data)
        self.wfile.write(response)


# This is the main method that will fire off the server.
if __name__ == '__main__':
    server_class = HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    print(time.asctime(), 'Server Starts - %s:%s' % (HOST_NAME, PORT_NUMBER))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(), 'Server Stops - %s:%s' % (HOST_NAME, PORT_NUMBER))
