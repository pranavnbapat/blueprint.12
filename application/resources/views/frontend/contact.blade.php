@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="contactArea">
                    <div class="contactAddress">
                        {!! html_entity_decode($contact->contact_info) !!}
                    </div>
                    <form id="contact_form" name="contact_form" method="post" action="{{ url('contact/submit') }}">
                        @csrf

                        <div class="contactForm">
                            <div class="formRow">
                                <label for="v_name">Name:</label>
                                <input type="text" name="v_name" id="v_name" required maxlength="100" />
                            </div>
                            <div class="formRow">
                                <label for="v_email">Email:</label>
                                <input type="email" name="v_email" id="v_email" required maxlength="50" />
                            </div>
                            <div class="formRow">
                                <label for="v_city">City:</label>
                                <input type="text" name="v_city" id="v_city" required maxlength="20" />
                            </div>
                            <div class="formRow">
                                <input type="submit" value="Subscribe to our mailing list" id="submit" name="submit" />
                            </div>
                        </div>
                    </form>
                </div> <!-- /.contactArea -->
            </div>
        </section>
    </main>
@endsection
