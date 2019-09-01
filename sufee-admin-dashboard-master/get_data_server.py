import requests
import json
# network ID 70B3D54992251D6C
# token 5d514d9ab5ef9f3809541123
network_id = "70B3D54992251D6C"
token = "5d514d9ab5ef9f3809541123"

import mysql.connector
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import json

PORT_NUMBER = 8000


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urlparse(self.path).query
        # print(query)
        # self.send_response(200)
        response = self.get_response()
        # print(response)

        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        self.wfile.write(json.dumps(response).encode())
        return

    def get_response(self):
        response = requests.get("http://alphax.cloud/conduit?id=" + network_id + "&limit=1&ch=1&token=" + token)
        # print(response.content)
        response_dict = json.loads(response.content)
        return response_dict[0]["data"]["val"]


if __name__ == "__main__":
    server = HTTPServer(("", PORT_NUMBER), Handler)
    print("Startd httpserver on port " + str(PORT_NUMBER))
    server.serve_forever()
