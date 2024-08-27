<?php

namespace App\Http\Controllers;  

use App\Models\Note;  
use Illuminate\Http\Request;  

class NoteController extends Controller  
{  
    public function index()  
    {  
        return Note::all();  
    }  

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);
    
        $note = new Note();
        $note->title = $request->input('title');
        $note->content = $request->input('content');
        $note->save();
    
        return response()->json($note, 201);
    }
     

    public function update(Request $request, $id)
{
    $request->validate([
        'title' => 'required|max:255',
        'content' => 'required',
    ]);

    $note = Note::findOrFail($id);
    $note->title = $request->input('title');
    $note->content = $request->input('content');
    $note->save();

    return response()->json($note, 200);
}

    public function destroy($id)  
    {  
        Note::destroy($id);  
        return response()->json(null, 204);  
    }  
}