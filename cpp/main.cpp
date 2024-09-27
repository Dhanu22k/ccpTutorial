#include<iostream>
using namespace std;


void merge(int arr[],int i,int mid,int j){
    int s1=(mid-i)+1;
    int s2=(j-mid);
    int a1[s1];
    int a2[s2];

    for(int p=0;p<s1;p++){
        a1[p]=arr[p+i];
    }

    for(int p=0;p<s2;p++){
        a2[p]=arr[p+mid+1];
    }

    int p1=0;
    int p2=0;
    int k=i;
    while(p1<s1&&p2<s2){
        if(a1[p1]<=a2[p2]){
            arr[k]=a1[p1++];
        }
        else{
            arr[k]=a2[p2++];
        }
        k++;
    }

    while(p1<s1){
        arr[k++]=a1[p1++];
    }

    while(p2<s2){
        arr[k++]=a1[p2++];
    }
}

void mergeSort(int arr[],int i,int j){
    if(i<j){
        int mid=(i+j)/2;
        mergeSort(arr,i,mid);
        mergeSort(arr,mid+1,j);
        merge(arr,i,mid,j);
    }
}

void printArray(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
    cout<<endl;
}
int main(){
    int arr[]={23,2,45,12,1,6,18,30};
    int n=8;
    cout<<"Array befor sorting"<<endl;
    printArray(arr,n);

    mergeSort(arr,0,n-1);

    cout<<"Array after sorting"<<endl;
    printArray(arr,n);
    return 0;
}