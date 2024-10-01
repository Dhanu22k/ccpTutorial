#include <iostream>
#include <cstdlib>  

int main() {
   
    const char* command = "node ../NodeJs/server.js";
    int result = system(command);

    if (result == 0) {
        std::cout << "Node.js script executed successfully." << std::endl;
    } else {
        std::cerr << "Failed to execute Node.js script." << std::endl;
    }

    return 0;
}
