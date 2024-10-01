#include<iostream>
using namespace std;
int main(int arlen,char** argc){
    int sum=0;
    for(int i=1;i<arlen;i++){
        if(isdigit(*argc[i])){
            sum=stoi(argc[i])+sum;
        }
        else{
            cout<<"bad argument!"<<endl;
            return 1;
        }
        
    }
    cout<<sum<<endl;
    return 0;
}